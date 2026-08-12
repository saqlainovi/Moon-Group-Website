export const readFileAsOriginalBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = reject;
  });
};
export async function storeImageInFirestoreChunks(base64DataUrl: string, prefix = 'img'): Promise<string> {
  return base64DataUrl;
}
export async function resolveImageRef(refStr: string): Promise<string> {
  return refStr;
}
export async function processObjectImagesForSave<T>(obj: T, pathPrefix = 'property'): Promise<T> {
  return obj;
}
export async function processObjectImagesForLoad<T>(obj: T): Promise<T> {
  return obj;
}
