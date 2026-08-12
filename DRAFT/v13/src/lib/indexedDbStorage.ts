/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const DB_NAME = 'HavenGroupImageCache';
const DB_VERSION = 1;
const STORE_NAME = 'images';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

export async function getLocalCachedImage(key: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function setLocalCachedImage(key: string, value: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

export async function extractImagesToIndexedDB(obj: any, prefix: string): Promise<any> {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    const promises = obj.map((item) => extractImagesToIndexedDB(item, prefix));
    return await Promise.all(promises);
  }

  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const val = result[key];
    if (typeof val === 'string' && val.startsWith('data:image')) {
      const dbKey = `idb_store_${prefix}_${key}_${Math.random().toString(36).substring(2, 9)}`;
      await setLocalCachedImage(dbKey, val);
      result[key] = `idb_store:${dbKey}`;
    } else if (typeof val === 'object' && val !== null) {
      result[key] = await extractImagesToIndexedDB(val, prefix);
    }
  }
  return result;
}

export async function restoreImagesFromIndexedDB(obj: any): Promise<any> {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    const promises = obj.map((item) => restoreImagesFromIndexedDB(item));
    return await Promise.all(promises);
  }

  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const val = result[key];
    if (typeof val === 'string' && val.startsWith('idb_store:')) {
      const dbKey = val.substring('idb_store:'.length);
      const base64 = await getLocalCachedImage(dbKey);
      if (base64) {
        result[key] = base64;
      }
    } else if (typeof val === 'object' && val !== null) {
      result[key] = await restoreImagesFromIndexedDB(val);
    }
  }
  return result;
}

export async function savePropertyToLocalStorage(property: any): Promise<void> {
  try {
    const safeProperty = await extractImagesToIndexedDB(property, `prop_${property.id}`);
    const existingRaw = localStorage.getItem('haven_local_properties');
    let propertiesList: any[] = existingRaw ? JSON.parse(existingRaw) : [];
    const index = propertiesList.findIndex((p: any) => p.id === safeProperty.id);
    if (index >= 0) {
      propertiesList[index] = safeProperty;
    } else {
      propertiesList.unshift(safeProperty);
    }
    localStorage.setItem('haven_local_properties', JSON.stringify(propertiesList));
  } catch (e) {
    console.warn('LocalStorage property write notice:', e);
  }
}

export async function getPropertiesFromLocalStorage(): Promise<any[]> {
  try {
    const existingRaw = localStorage.getItem('haven_local_properties');
    if (!existingRaw) return [];
    const rawList = JSON.parse(existingRaw);
    return await restoreImagesFromIndexedDB(rawList);
  } catch {
    return [];
  }
}

export function removePropertyFromLocalStorage(id: string): void {
  try {
    const existingRaw = localStorage.getItem('haven_local_properties');
    if (!existingRaw) return;
    let propertiesList: any[] = JSON.parse(existingRaw);
    propertiesList = propertiesList.filter((p: any) => p.id !== id);
    localStorage.setItem('haven_local_properties', JSON.stringify(propertiesList));
  } catch {
    // ignore
  }
}

export async function saveSiteSettingsToLocalStorage(settings: any): Promise<void> {
  try {
    const safeSettings = await extractImagesToIndexedDB(settings, 'site_settings');
    localStorage.setItem('haven_local_site_settings', JSON.stringify(safeSettings));
  } catch (e) {
    console.warn('LocalStorage site settings write notice:', e);
  }
}

export async function getSiteSettingsFromLocalStorage(): Promise<any | null> {
  try {
    const raw = localStorage.getItem('haven_local_site_settings');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return await restoreImagesFromIndexedDB(parsed);
  } catch {
    return null;
  }
}

export async function saveSlideToLocalStorage(slide: any): Promise<void> {
  try {
    const safeSlide = await extractImagesToIndexedDB(slide, `slide_${slide.id}`);
    const existingRaw = localStorage.getItem('haven_local_slides');
    let slidesList: any[] = existingRaw ? JSON.parse(existingRaw) : [];
    const index = slidesList.findIndex((s: any) => s.id === safeSlide.id);
    if (index >= 0) {
      slidesList[index] = safeSlide;
    } else {
      slidesList.unshift(safeSlide);
    }
    localStorage.setItem('haven_local_slides', JSON.stringify(slidesList));

    // Remove from deleted list if it was re-added
    const deletedRaw = localStorage.getItem('haven_deleted_slide_ids');
    if (deletedRaw) {
      let deletedIds: string[] = JSON.parse(deletedRaw);
      deletedIds = deletedIds.filter(id => id !== safeSlide.id);
      localStorage.setItem('haven_deleted_slide_ids', JSON.stringify(deletedIds));
    }
  } catch (e) {
    console.warn('LocalStorage slide write notice:', e);
  }
}

export async function getSlidesFromLocalStorage(): Promise<any[]> {
  try {
    const existingRaw = localStorage.getItem('haven_local_slides');
    if (!existingRaw) return [];
    const rawList = JSON.parse(existingRaw);
    return await restoreImagesFromIndexedDB(rawList);
  } catch {
    return [];
  }
}

export function removeSlideFromLocalStorage(id: string): void {
  try {
    const existingRaw = localStorage.getItem('haven_local_slides');
    if (existingRaw) {
      let slidesList: any[] = JSON.parse(existingRaw);
      slidesList = slidesList.filter((s: any) => s.id !== id);
      localStorage.setItem('haven_local_slides', JSON.stringify(slidesList));
    }
    const deletedRaw = localStorage.getItem('haven_deleted_slide_ids');
    let deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
    }
    localStorage.setItem('haven_deleted_slide_ids', JSON.stringify(deletedIds));
  } catch (e) {
    console.warn('LocalStorage slide remove notice:', e);
  }
}

export function getDeletedSlideIdsFromLocalStorage(): string[] {
  try {
    const raw = localStorage.getItem('haven_deleted_slide_ids');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveAboutUsToLocalStorage(aboutUs: any): Promise<void> {
  try {
    const safeAboutUs = await extractImagesToIndexedDB(aboutUs, 'about_us');
    localStorage.setItem('haven_local_about_us', JSON.stringify(safeAboutUs));
  } catch (e) {
    console.warn('LocalStorage about_us write notice:', e);
  }
}

export async function getAboutUsFromLocalStorage(): Promise<any | null> {
  try {
    const raw = localStorage.getItem('haven_local_about_us');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return await restoreImagesFromIndexedDB(parsed);
  } catch {
    return null;
  }
}

export async function saveGroupConcernToLocalStorage(concern: any): Promise<void> {
  try {
    const safeConcern = await extractImagesToIndexedDB(concern, `concern_${concern.id}`);
    const existingRaw = localStorage.getItem('haven_local_concerns');
    let concernsList: any[] = existingRaw ? JSON.parse(existingRaw) : [];
    const index = concernsList.findIndex((c: any) => c.id === safeConcern.id);
    if (index >= 0) {
      concernsList[index] = safeConcern;
    } else {
      concernsList.unshift(safeConcern);
    }
    localStorage.setItem('haven_local_concerns', JSON.stringify(concernsList));
  } catch (e) {
    console.warn('LocalStorage concern write notice:', e);
  }
}

export async function getGroupConcernsFromLocalStorage(): Promise<any[]> {
  try {
    const existingRaw = localStorage.getItem('haven_local_concerns');
    if (!existingRaw) return [];
    const rawList = JSON.parse(existingRaw);
    return await restoreImagesFromIndexedDB(rawList);
  } catch {
    return [];
  }
}

export function removeGroupConcernFromLocalStorage(id: string): void {
  try {
    const existingRaw = localStorage.getItem('haven_local_concerns');
    if (!existingRaw) return;
    let concernsList: any[] = JSON.parse(existingRaw);
    concernsList = concernsList.filter((c: any) => c.id !== id);
    localStorage.setItem('haven_local_concerns', JSON.stringify(concernsList));
  } catch (e) {
    console.warn('LocalStorage concern remove notice:', e);
  }
}

export async function saveTestimonialToLocalStorage(testimonial: any): Promise<void> {
  try {
    const safeTestimonial = await extractImagesToIndexedDB(testimonial, `testimonial_${testimonial.id}`);
    const existingRaw = localStorage.getItem('haven_local_testimonials');
    let testimonialsList: any[] = existingRaw ? JSON.parse(existingRaw) : [];
    const index = testimonialsList.findIndex((t: any) => t.id === safeTestimonial.id);
    if (index >= 0) {
      testimonialsList[index] = safeTestimonial;
    } else {
      testimonialsList.unshift(safeTestimonial);
    }
    localStorage.setItem('haven_local_testimonials', JSON.stringify(testimonialsList));
  } catch (e) {
    console.warn('LocalStorage testimonial write notice:', e);
  }
}

export async function getTestimonialsFromLocalStorage(): Promise<any[]> {
  try {
    const existingRaw = localStorage.getItem('haven_local_testimonials');
    if (!existingRaw) return [];
    const rawList = JSON.parse(existingRaw);
    return await restoreImagesFromIndexedDB(rawList);
  } catch {
    return [];
  }
}

export function removeTestimonialFromLocalStorage(id: string): void {
  try {
    const existingRaw = localStorage.getItem('haven_local_testimonials');
    if (!existingRaw) return;
    let testimonialsList: any[] = JSON.parse(existingRaw);
    testimonialsList = testimonialsList.filter((t: any) => t.id !== id);
    localStorage.setItem('haven_local_testimonials', JSON.stringify(testimonialsList));
  } catch (e) {
    console.warn('LocalStorage testimonial remove notice:', e);
  }
}


