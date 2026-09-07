import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const { Pool } = pg;

let dbInstance: any = null;

export function getDb() {
  if (!dbInstance) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      console.warn('[AI Studio] DATABASE_URL environment variable is not defined — using mock fallback.');
      const noOp = {
        findMany: async () => [],
        findFirst: async () => null,
        findUnique: async () => null,
        create: async (d: any) => d?.data ?? {},
        update: async (d: any) => d?.data ?? {},
        delete: async () => ({}),
      };
      dbInstance = new Proxy({}, {
        get: (_, prop) => (prop === 'query' ? new Proxy({}, { get: () => noOp }) : async () => []),
      });
      return dbInstance;
    }
    try {
      const pool = new Pool({
        connectionString,
        max: 10,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      });
      dbInstance = drizzle(pool, { schema });
    } catch {
      console.warn('[AI Studio] Database not connected — using mock fallback');
      const noOp = {
        findMany: async () => [],
        findFirst: async () => null,
        findUnique: async () => null,
        create: async (d: any) => d?.data ?? {},
        update: async (d: any) => d?.data ?? {},
        delete: async () => ({}),
      };
      dbInstance = new Proxy({}, {
        get: (_, prop) => (prop === 'query' ? new Proxy({}, { get: () => noOp }) : async () => []),
      });
    }
  }
  return dbInstance;
}

export { schema };
