import fs from 'fs';
let code = fs.readFileSync('src/components/AdminCMS.tsx', 'utf8');

if (!code.includes('import { logout }')) {
  code = code.replace("getAccessToken } from '../lib/driveUpload';", "getAccessToken, logout } from '../lib/driveUpload';");
}

code = code.replace(
  "setAuthError('Unauthorized Google account. Access restricted.');",
  "setAuthError('Unauthorized Google account. Access restricted.');\n           await logout();"
);

fs.writeFileSync('src/components/AdminCMS.tsx', code);
console.log("Fixed logout");
