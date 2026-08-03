import { supabase } from './src/lib/supabase.js';

async function checkSize() {
  const { data, error } = await supabase.rpc('get_db_size');
  if (error) {
     console.error("RPC failed, let's try a direct query");
  } else {
     console.log(data);
  }
}
checkSize();
