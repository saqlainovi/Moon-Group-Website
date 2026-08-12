import fs from 'fs';
let code = fs.readFileSync('src/lib/supabase.ts', 'utf8');

code = code.replace(
  "export const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '';",
  "export const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || SUPABASE_ANON_KEY;"
);

code = code.replace(
  "export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY || 'dummy-secret-key-to-prevent-browser-initialization-error');",
  "export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);"
);

fs.writeFileSync('src/lib/supabase.ts', code);
console.log('Fixed supabase client');
