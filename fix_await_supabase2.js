import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace("async function await saveToSupabase", "async function saveToSupabase");

fs.writeFileSync('server.ts', code);
console.log('Fixed function definition');
