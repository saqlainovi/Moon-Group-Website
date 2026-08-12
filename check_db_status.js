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

async function diagnose() {
  console.log("--- FIREBASE FIRESTORE DATA ---");
  const collections = ['properties', 'hero_slides', 'group_concerns', 'site_settings', 'about_us'];
  for (const c of collections) {
    try {
      const snap = await getDocs(collection(db, c));
      console.log(`Firebase collection '${c}' has ${snap.docs.length} documents.`);
      if (snap.docs.length > 0) {
        console.log(`Sample IDs:`, snap.docs.map(d => d.id).slice(0, 5));
        if (c === 'site_settings') {
          snap.docs.forEach(d => {
            console.log(`Document '${d.id}' sample fields:`, Object.keys(d.data()));
          });
        }
      }
    } catch (e) {
      console.log(`Error reading Firebase collection ${c}:`, e.message);
    }
  }

  console.log("\n--- SUPABASE DATA ---");
  try {
    const { data, error } = await supabase.from('cms_store').select('key, updated_at');
    if (error) {
      console.log("Error reading Supabase:", error.message);
    } else {
      data.forEach(row => {
        console.log(`Supabase key '${row.key}' updated at: ${row.updated_at}`);
      });
    }
  } catch (e) {
    console.log("Supabase error:", e.message);
  }
}

diagnose();
