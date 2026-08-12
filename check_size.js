import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://lxxelzbkygsghqbzqius.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Chm40wmoZqbxfO9NjjAiFQ_cdIY0fTs';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
async function check() {
  const { data } = await supabase.from('cms_store').select('key, value');
  data.forEach(d => {
    console.log(d.key, JSON.stringify(d.value).length / 1024 / 1024, "MB");
  });
}
check();
