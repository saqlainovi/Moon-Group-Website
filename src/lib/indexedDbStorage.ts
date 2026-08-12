export const initIndexedDB = async (): Promise<any> => null;
export const setLocalCachedImage = async (key: string, base64: string): Promise<void> => {
  try {
    localStorage.setItem(`img_${key}`, base64);
  } catch (e) {}
};
export const getLocalCachedImage = async (key: string): Promise<string | null> => {
  try {
    return localStorage.getItem(`img_${key}`);
  } catch (e) {
    return null;
  }
};

export async function savePropertyToLocalStorage(property: any): Promise<void> {
  try {
    const existing = await getPropertiesFromLocalStorage();
    const map = new Map<string, any>();
    existing.forEach(p => map.set(p.id, p));
    map.set(property.id, property);
    localStorage.setItem('moon_properties_cache', JSON.stringify(Array.from(map.values())));
  } catch (e) {
    console.warn('Failed to save property to localStorage:', e);
  }
}

export async function getPropertiesFromLocalStorage(): Promise<any[]> {
  try {
    const data = localStorage.getItem('moon_properties_cache');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to get properties from localStorage:', e);
  }
  return [];
}

export function saveAllPropertiesToLocalStorage(properties: any[]): void {
  try {
    localStorage.setItem('moon_properties_cache', JSON.stringify(properties));
  } catch (e) {
    console.warn('Failed to save all properties to localStorage:', e);
  }
}

export function removePropertyFromLocalStorage(id: string): void {
  try {
    const existing = JSON.parse(localStorage.getItem('moon_properties_cache') || '[]');
    const filtered = existing.filter((p: any) => p.id !== id);
    localStorage.setItem('moon_properties_cache', JSON.stringify(filtered));
  } catch (e) {}
}

export async function saveSiteSettingsToLocalStorage(settings: any): Promise<void> {
  try {
    localStorage.setItem('moon_settings_cache', JSON.stringify(settings));
  } catch (e) {}
}

export async function getSiteSettingsFromLocalStorage(): Promise<any | null> {
  try {
    const data = localStorage.getItem('moon_settings_cache');
    if (data) return JSON.parse(data);
  } catch (e) {}
  return null;
}

export async function saveSlideToLocalStorage(slide: any): Promise<void> {
  try {
    const existing = await getSlidesFromLocalStorage();
    const map = new Map<string, any>();
    existing.forEach(s => map.set(s.id, s));
    map.set(slide.id, slide);
    localStorage.setItem('moon_slides_cache', JSON.stringify(Array.from(map.values())));
  } catch (e) {}
}

export async function getSlidesFromLocalStorage(): Promise<any[]> {
  try {
    const data = localStorage.getItem('moon_slides_cache');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return [];
}

export function saveAllSlidesToLocalStorage(slides: any[]): void {
  try {
    localStorage.setItem('moon_slides_cache', JSON.stringify(slides));
  } catch (e) {}
}

export function removeSlideFromLocalStorage(id: string): void {
  try {
    const existing = JSON.parse(localStorage.getItem('moon_slides_cache') || '[]');
    const filtered = existing.filter((s: any) => s.id !== id);
    localStorage.setItem('moon_slides_cache', JSON.stringify(filtered));

    const deletedIds = getDeletedSlideIdsFromLocalStorage();
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem('moon_deleted_slides', JSON.stringify(deletedIds));
    }
  } catch (e) {}
}

export function getDeletedSlideIdsFromLocalStorage(): string[] {
  try {
    const data = localStorage.getItem('moon_deleted_slides');
    if (data) return JSON.parse(data);
  } catch (e) {}
  return [];
}

export async function saveAboutUsToLocalStorage(aboutUs: any): Promise<void> {
  try {
    localStorage.setItem('moon_about_cache', JSON.stringify(aboutUs));
  } catch (e) {}
}

export async function getAboutUsFromLocalStorage(): Promise<any | null> {
  try {
    const data = localStorage.getItem('moon_about_cache');
    if (data) return JSON.parse(data);
  } catch (e) {}
  return null;
}

export async function saveGroupConcernToLocalStorage(concern: any): Promise<void> {
  try {
    const existing = await getGroupConcernsFromLocalStorage();
    const map = new Map<string, any>();
    existing.forEach(c => map.set(c.id, c));
    map.set(concern.id, concern);
    localStorage.setItem('moon_concerns_cache', JSON.stringify(Array.from(map.values())));
  } catch (e) {}
}

export async function getGroupConcernsFromLocalStorage(): Promise<any[]> {
  try {
    const data = localStorage.getItem('moon_concerns_cache');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return [];
}

export function removeGroupConcernFromLocalStorage(id: string): void {
  try {
    const existing = JSON.parse(localStorage.getItem('moon_concerns_cache') || '[]');
    const filtered = existing.filter((c: any) => c.id !== id);
    localStorage.setItem('moon_concerns_cache', JSON.stringify(filtered));
  } catch (e) {}
}

export async function saveTestimonialToLocalStorage(testimonial: any): Promise<void> {
  try {
    const existing = await getTestimonialsFromLocalStorage();
    const map = new Map<string, any>();
    existing.forEach(t => map.set(t.id, t));
    map.set(testimonial.id, testimonial);
    localStorage.setItem('moon_testimonials_cache', JSON.stringify(Array.from(map.values())));
  } catch (e) {}
}

export async function getTestimonialsFromLocalStorage(): Promise<any[]> {
  try {
    const data = localStorage.getItem('moon_testimonials_cache');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return [];
}

export function removeTestimonialFromLocalStorage(id: string): void {
  try {
    const existing = JSON.parse(localStorage.getItem('moon_testimonials_cache') || '[]');
    const filtered = existing.filter((t: any) => t.id !== id);
    localStorage.setItem('moon_testimonials_cache', JSON.stringify(filtered));
  } catch (e) {}
}

