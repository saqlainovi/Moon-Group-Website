import fs from 'fs';

// 1. Modify imageUtils.ts to not popup
let imageUtils = fs.readFileSync('src/lib/imageUtils.ts', 'utf8');
imageUtils = imageUtils.replace(
  "     const authRes = await googleSignIn();\n     if (!authRes) throw new Error('Authentication required to upload image to Google Drive.');\n     token = authRes.accessToken;",
  "     throw new Error('AUTH_REQUIRED');"
);
fs.writeFileSync('src/lib/imageUtils.ts', imageUtils);
console.log('Modified imageUtils.ts');
