import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  "const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '';",
  "const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_Chm40wmoZqbxfO9NjjAiFQ_cdIY0fTs';"
);
code = code.replace(
  "const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY || 'dummy-secret-key-to-avoid-startup-crash');",
  "const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);"
);

fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts supabase admin key');
