/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);

let quotaExceededFlag = false;
const QUOTA_COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

export function isQuotaExceeded(): boolean {
  if (typeof window !== 'undefined') {
    const timeStr = sessionStorage.getItem('mbl_firestore_quota_exceeded_time');
    if (timeStr) {
      const time = parseInt(timeStr, 10);
      if (Date.now() - time > QUOTA_COOLDOWN_MS) {
        resetQuotaExceededFlag();
        return false;
      }
      return true;
    }
  }
  return quotaExceededFlag;
}

export function markQuotaExceeded(): void {
  quotaExceededFlag = true;
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('mbl_firestore_quota_exceeded', 'true');
    sessionStorage.setItem('mbl_firestore_quota_exceeded_time', String(Date.now()));
  }
}

export function resetQuotaExceededFlag(): void {
  quotaExceededFlag = false;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('mbl_firestore_quota_exceeded');
    sessionStorage.removeItem('mbl_firestore_quota_exceeded_time');
  }
}

// Test database connection on boot
async function testConnection() {
  if (quotaExceededFlag) return;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error || (error && typeof error === 'object')) {
      const msg = String((error as any).message || '');
      const code = String((error as any).code || '');
      if (msg.includes('quota') || msg.includes('resource-exhausted') || code === 'resource-exhausted') {
        markQuotaExceeded();
        console.warn("Firestore quota limit reached. Using local storage fallback.");
      } else if (msg.includes('the client is offline')) {
        console.warn("Firebase client offline. Using local storage fallback.");
      }
    }
  }
}
testConnection();

// Structured Error Handling for Firestore as requested by the firebase-integration skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function withTimeout<T>(promise: Promise<T>, ms = 5000, rejectOnTimeout = false): Promise<T> {
  if (quotaExceededFlag && rejectOnTimeout) {
    return Promise.reject(new Error('Firebase operation skipped: Daily Firestore quota exceeded'));
  }
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      if (rejectOnTimeout) {
        reject(new Error('Firebase operation timed out'));
      } else {
        resolve(null as any);
      }
    }, ms);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        const errMsg = String(err?.message || '').toLowerCase();
        if (errMsg.includes('quota') || errMsg.includes('resource-exhausted') || (err as any)?.code === 'resource-exhausted') {
          markQuotaExceeded();
        }
        reject(err);
      });
  });
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
