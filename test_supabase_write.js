import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lxxelzbkygsghqbzqius.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Chm40wmoZqbxfO9NjjAiFQ_cdIY0fTs';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testWrite() {
  const { data, error } = await supabase.from('cms_store').upsert({
    key: 'test_key',
    value: { hello: "world" },
    updated_at: new Date().toISOString()
  });
  console.log("Write Result:", { data, error });
  
  const { data: readData, error: readError } = await supabase.from('cms_store').select('*').eq('key', 'test_key');
  console.log("Read Result:", { data: readData, error: readError });
}

testWrite();
