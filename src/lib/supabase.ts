import { createClient } from '@supabase/supabase-js';

// Safe environment variable helper for both Node (Server) and Vite (Browser)
function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  // Vite client-side env variables are prefixed with VITE_
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {
    // ignore
  }
  return undefined;
}

// User's Supabase Project Credentials
export const SUPABASE_URL = 
  getEnv('VITE_SUPABASE_URL') || 
  getEnv('SUPABASE_URL') || 
  'https://lxxelzbkygsghqbzqius.supabase.co';

export const SUPABASE_ANON_KEY = 
  getEnv('VITE_SUPABASE_ANON_KEY') || 
  getEnv('SUPABASE_ANON_KEY') || 
  'sb_publishable_Chm40wmoZqbxfO9NjjAiFQ_cdIY0fTs';

export const SUPABASE_SECRET_KEY = 
  getEnv('SUPABASE_SERVICE_ROLE_KEY') || 
  getEnv('SUPABASE_SECRET_KEY') || 
  SUPABASE_ANON_KEY;

// Client for Browser / Public operations
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Client for Server-side operations (uses secret key to bypass RLS restrictions)
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

