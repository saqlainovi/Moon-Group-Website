import { createClient } from '@supabase/supabase-js';

// User's Supabase Project Credentials
export const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://lxxelzbkygsghqbzqius.supabase.co';
export const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
export const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || SUPABASE_ANON_KEY;

// Client for Browser / Public operations
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Client for Server-side operations (uses secret key to bypass RLS restrictions)
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);
