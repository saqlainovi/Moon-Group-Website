import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./src/firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SUPABASE_URL = 'https://lxxelzbkygsghqbzqius.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Chm40wmoZqbxfO9NjjAiFQ_cdIY0fTs';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function clone() {
  console.log("Starting clone...");
  
  const collections = ['properties', 'hero_slides', 'group_concerns', 'testimonials', 'bookings', 'inquiries', 'partnerships'];
  
  for (const collName of collections) {
     console.log("Fetching", collName);
     try {
       const snap = await getDocs(collection(db, collName));
       const items = snap.docs.map(d => d.data());
       console.log(`Found ${items.length} items in ${collName}`);
       
       let sbKey = collName;
       if (collName === 'hero_slides') sbKey = 'heroSlides';
       if (collName === 'group_concerns') sbKey = 'groupConcerns';
       
       if (items.length > 0) {
           await supabase.from('cms_store').upsert({
              key: sbKey,
              value: items,
              updated_at: new Date().toISOString()
           });
           console.log(`Saved ${items.length} items to Supabase key: ${sbKey}`);
       }
     } catch(e) {
       console.error("Error with collection", collName, e.message);
     }
  }

  // Singletons
  const singletons = [
    { fbColl: 'site_settings', fbDoc: 'global', sbKey: 'siteSettings' },
    { fbColl: 'about_us', fbDoc: 'main', sbKey: 'aboutUs' }
  ];
  
  for (const s of singletons) {
    try {
      const docSnap = await getDoc(doc(db, s.fbColl, s.fbDoc));
      if (docSnap.exists()) {
        const data = docSnap.data();
        await supabase.from('cms_store').upsert({
           key: s.sbKey,
           value: data,
           updated_at: new Date().toISOString()
        });
        console.log(`Saved singleton to Supabase key: ${s.sbKey}`);
      }
    } catch(e) {
       console.error("Error with singleton", s.fbColl, e.message);
    }
  }
  
  console.log("Clone complete!");
  process.exit(0);
}
clone();
