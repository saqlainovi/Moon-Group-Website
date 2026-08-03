export const initIndexedDB = async (): Promise<any> => null;
export const setLocalCachedImage = async (key: string, base64: string): Promise<void> => {};
export const getLocalCachedImage = async (key: string): Promise<string | null> => null;
export async function savePropertyToLocalStorage(property: any): Promise<void> {}
export async function getPropertiesFromLocalStorage(): Promise<any[]> { return []; }
export function removePropertyFromLocalStorage(id: string): void {}
export async function saveSiteSettingsToLocalStorage(settings: any): Promise<void> {}
export async function getSiteSettingsFromLocalStorage(): Promise<any | null> { return null; }
export async function saveSlideToLocalStorage(slide: any): Promise<void> {}
export async function getSlidesFromLocalStorage(): Promise<any[]> { return []; }
export function removeSlideFromLocalStorage(id: string): void {}
export function getDeletedSlideIdsFromLocalStorage(): string[] { return []; }
export async function saveAboutUsToLocalStorage(aboutUs: any): Promise<void> {}
export async function getAboutUsFromLocalStorage(): Promise<any | null> { return null; }
export async function saveGroupConcernToLocalStorage(concern: any): Promise<void> {}
export async function getGroupConcernsFromLocalStorage(): Promise<any[]> { return []; }
export function removeGroupConcernFromLocalStorage(id: string): void {}
export async function saveTestimonialToLocalStorage(testimonial: any): Promise<void> {}
export async function getTestimonialsFromLocalStorage(): Promise<any[]> { return []; }
export function removeTestimonialFromLocalStorage(id: string): void {}
