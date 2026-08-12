import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lxxelzbkygsghqbzqius.supabase.co';
const SUPABASE_SECRET_KEY = 'sb_publishable_Chm40wmoZqbxfO9NjjAiFQ_cdIY0fTs';
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

async function check() {
  const { data, error } = await supabaseAdmin.from('cms_store').select('value').eq('key', 'properties').maybeSingle();
  console.log(error || data?.value?.length);
}
check();
