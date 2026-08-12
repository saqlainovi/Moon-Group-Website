import fs from 'fs';
let code = fs.readFileSync('src/components/AdminCMS.tsx', 'utf8');

const regex = /if\s*\(err\.message\s*===\s*'AUTH_REQUIRED'\)\s*\{\s*triggerStatus\('error',\s*'[^']+'\);\s*return;\s*\}/g;
code = code.replace(regex, '');

fs.writeFileSync('src/components/AdminCMS.tsx', code);
console.log('Removed AUTH_REQUIRED checks');
