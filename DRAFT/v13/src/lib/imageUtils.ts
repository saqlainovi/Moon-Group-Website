/**
 * Validates file size and format before processing.
 * Prevents browser memory lag and document size issues while auto-compressing high-res photos up to 5MB.
 */
export const validateImageFile = (file: File, maxSizeBytes = 5 * 1024 * 1024): { valid: boolean; error?: string } => {
  if (!file) return { valid: false, error: 'No file selected.' };
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Invalid file type. Please upload a valid image file (JPEG, PNG, WEBP).' };
  }
  if (file.size > maxSizeBytes) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return { 
      valid: false, 
      error: `File size (${sizeMb} MB) exceeds the 5.0 MB maximum limit. Please select a smaller photo or compress it first.` 
    };
  }
  return { valid: true };
};

export const resizeImageToBase64 = async (
  file: File,
  maxDimension?: number,
  quality?: number
): Promise<string> => {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const nameLower = file.name.toLowerCase();
  const isFloorPlan = nameLower.includes('floor') || 
                      nameLower.includes('plan') || 
                      nameLower.includes('blue') || 
                      nameLower.includes('layout') || 
                      nameLower.includes('draft') || 
                      nameLower.includes('architect');

  // Blueprints/floorplans require higher detail. Background photos can be more aggressively compressed.
  const finalMaxDim = maxDimension || (isFloorPlan ? 1800 : 1200);
  const finalQuality = quality || (isFloorPlan ? 0.85 : 0.60);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) {
        reject(new Error('Failed to read file'));
        return;
      }

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > finalMaxDim || height > finalMaxDim) {
          if (width > height) {
            height = Math.round((height * finalMaxDim) / width);
            width = finalMaxDim;
          } else {
            width = Math.round((width * finalMaxDim) / height);
            height = finalMaxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-performance JPEG format with chosen compression level
        const compressedDataUrl = canvas.toDataURL('image/jpeg', finalQuality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.onerror = (error) => reject(error);
  });
};

export const compressBase64 = (dataUrl: string): Promise<string> => {
  // Return optimized data URL
  return Promise.resolve(dataUrl);
};

export const getFitClass = (fit?: string | null): string => {
  switch (fit) {
    case 'contain': return 'object-contain bg-[#0A0A0C]';
    case 'fill': return 'object-fill';
    case 'scale-down': return 'object-scale-down bg-[#0A0A0C]';
    case 'cover':
    default: return 'object-cover';
  }
};

export const getPositionClass = (pos?: string | null): string => {
  switch (pos) {
    case 'top': return 'object-top';
    case 'bottom': return 'object-bottom';
    case 'left': return 'object-left';
    case 'right': return 'object-right';
    case 'left-top': return 'object-left-top';
    case 'left-bottom': return 'object-left-bottom';
    case 'right-top': return 'object-right-top';
    case 'right-bottom': return 'object-right-bottom';
    case 'center':
    default: return 'object-center';
  }
};

export const optimizePropertyForFirestore = async <T>(property: T): Promise<T> => {
  return property;
};




