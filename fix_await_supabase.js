import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/saveToSupabase\(/g, 'await saveToSupabase(');

fs.writeFileSync('server.ts', code);
console.log('Fixed await saveToSupabase');
