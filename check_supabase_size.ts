import { supabase } from './src/lib/supabase';
async function checkSize() {
  const { data, error } = await supabase.from('cms_store').select('*');
  console.log("cms_store length:", data ? data.length : "error", error);
}
checkSize();
