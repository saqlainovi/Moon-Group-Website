import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://lxxelzbkygsghqbzqius.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Chm40wmoZqbxfO9NjjAiFQ_cdIY0fTs';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function test() {
  console.log("Fetching siteSettings before update...");
  const { data: before } = await supabase.from('cms_store').select('value').eq('key', 'siteSettings').single();
  const oldTagline = before.value.tagline;
  console.log("Old tagline:", oldTagline);
  
  const newTagline = "Building Bangladesh's homes and premium skylines since 1989. [TEST]";
  before.value.tagline = newTagline;
  
  console.log("Updating siteSettings...");
  await supabase.from('cms_store').upsert({
    key: 'siteSettings',
    value: before.value,
    updated_at: new Date().toISOString()
  });
  
  console.log("Fetching siteSettings after update...");
  const { data: after } = await supabase.from('cms_store').select('value').eq('key', 'siteSettings').single();
  console.log("New tagline:", after.value.tagline);
  
  if (after.value.tagline === newTagline) {
     console.log("SUCCESS: Supabase read/write works perfectly.");
     
     // Revert back
     before.value.tagline = oldTagline;
     await supabase.from('cms_store').upsert({
       key: 'siteSettings',
       value: before.value,
       updated_at: new Date().toISOString()
     });
     console.log("Reverted to original.");
  } else {
     console.error("FAIL: Supabase didn't update.");
  }
}
test();
