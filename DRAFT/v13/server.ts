import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { properties as defaultProperties } from './src/data/properties';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cms_db.json');

// Supabase Connection Settings
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://lxxelzbkygsghqbzqius.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

// Helper to save key-value data to Supabase
async function saveToSupabase(key: string, data: any) {
  try {
    const { error } = await supabaseAdmin.from('cms_store').upsert(
      { key, value: data, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );
    if (error) {
      console.warn(`[Supabase Sync Note] ${key}: ${error.message}`);
    } else {
      console.log(`[Supabase Sync] Successfully saved ${key} to Supabase cloud database.`);
    }
  } catch (err: any) {
    console.warn(`[Supabase Sync Warning] ${key}:`, err?.message || err);
  }
}

// Helper to load key-value data from Supabase
async function loadFromSupabase(key: string): Promise<any | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('cms_store')
      .select('value')
      .eq('key', key)
      .maybeSingle();

    if (!error && data && data.value) {
      return data.value;
    }
  } catch (err: any) {
    console.warn(`[Supabase Fetch Warning] ${key}:`, err?.message || err);
  }
  return null;
}

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default initial database content
const defaultSiteSettings = {
  id: 'main',
  tickerText: '📢 বিশেষ বিজ্ঞপ্তি: হেভেন টাওয়ার (HEAVEN TOWER) উদ্বোধন হয়েছে - বুকিং ও সেল চলছে! 🏢 ✦ 🔥 HEAVEN TOWER INAUGURATED - BOOKING & SALES NOW OPEN! ✦ REAL ESTATE ✦ HOUSING ✦ CONSTRUCTION ✦ INTERIORS ✦ COMMERCIAL SPACES ✦ SINCE 1989 ✦',
  hotlinePhone: '+88 02 9009153',
  whatsappPhone: '+8801313401405',
  emailAddress: 'moongroupofindustrylimited@gmail.com',
  headOffice: 'Mizan Tower, Mirpur Road, Kallyanpur, Dhaka-1207',
  facebookLink: 'https://facebook.com',
  linkedinLink: 'https://linkedin.com',
  twitterLink: 'https://twitter.com',
  instagramLink: 'https://instagram.com',
  youtubeLink: 'https://youtube.com',
  brandName: 'MOON GROUP OF INDUSTRIES LTD',
  tagline: 'Building Bangladesh\'s homes and premium skylines since 1989.',
  rehabRegNo: 'Reg # 1452/2012',
  rajukCodeNo: 'Code # DL-3215',
  telephoneNumbers: '0241002945, 0241002946, 0241002947, 0241002948, 0241002949, 0241000182',
  copyrightText: '© 2026 Moon Builders — Moon Group of Industries. All rights reserved.',
  showVirtualConfigurator: true,
  showHavenTowerBanner: true,
  havenTowerBannerImage: '/haven_tower/img_4.jpg',
  havenTowerTitle: 'HEAVEN TOWER by Moon Group',
  havenTowerDescription: '📢 হেভেন টাওয়ার (HEAVEN TOWER) এর উদ্বোধন সম্পন্ন হয়েছে - বর্তমানে বুকিং এবং সেল চলছে! আকর্ষণীয় আর্কিটেকচার, ডাবল-হাইট এট্রিয়াম লবি, রুফটপ ইনফিনিটি পুল এবং Zone-4 ভূমিকম্প প্রতিরোধী স্ট্রাকচার বিশিষ্ট মুন গ্রুপের ফ্ল্যাগশিপ প্রজেক্ট।'
};

const defaultAboutUs = {
  id: 'main',
  tagline: 'A Legacy Since 1989',
  title: 'FOUR DECADES OF\nBUILDING TRUST.',
  paragraph1: 'Moon Builders is the construction and real estate arm of Moon Group of Industries, founded in 1989 under the visionary leadership of Al-haj Mizanur Rahman. What began with a single housing venture has grown into a conglomerate spanning real estate, housing, construction, textiles, hospitality, and agriculture — with the exact same site discipline applied on every project, big or small.',
  paragraph2: 'We handle the full span of delivery: land assessment, structural engineering, on-site raw material quality control, and timely handover. Our promise is simple: what is drafted on paper is precisely what stands on the ground.',
  imageUrl: 'https://images.unsplash.com/photo-1609867271967-a82f85c48531?fm=jpg&q=70&w=1400&auto=format&fit=crop',
  yearFounded: 1989,
  sisterConcernsCount: 19,
  sectorsActiveCount: 11
};

const defaultHeroSlides = [
  {
    id: 'haven-tower',
    title: 'Heaven Tower',
    type: 'residential',
    status: 'ongoing',
    description: '★ MAIN ATTRACTION - HEAVEN TOWER INAUGURATED! Moon Group’s flagship architectural masterpiece featuring double-height atrium lobby, rooftop sky infinity pool, high-speed elevators, Zone-4 earthquake resistance, and smart home luxury. Booking & sales now open!',
    imageUrl: '/haven_tower/img_4.jpg',
    tag: '🔥 FLAGSHIP PROJECT - NOW OPEN FOR BOOKING',
    price: 'Tk 2.2 - 5.5 Crore',
    stats: { beds: '4 Beds', baths: '4 Baths', size: '1,850 - 3,600 Sft' }
  },
  {
    id: 'slide-1',
    title: 'Sun Moon Star',
    type: 'residential',
    status: 'ongoing',
    description: 'An architectural masterwork soaring into the Dhaka skyline. Sun Moon Star redefines urban luxury with towering architectural grandeur, cantilevered garden terraces, and majestic 270-degree views of Gulshan Lake.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1ipWRwMZ9rmEX0zlwXwZKj-AsRRipCuim',
    tag: 'Flagship Residential',
    price: 'Tk 6.5 - 9.8 Crore',
    stats: { beds: '4 Beds', baths: '5 Baths', size: '3,250 - 4,800 Sft' }
  },
  {
    id: 'slide-2',
    title: 'Al-Mizan Shopping Complex & Masjid Market',
    type: 'residential',
    status: 'completed',
    description: 'An oasis of refined luxury. Designed by internationally acclaimed architects, Al-Mizan Shopping Complex & Masjid Market merges premium commercial & residential spaces, expansive floor-to-ceiling panoramic glass, and a boutique community ambiance in the heart of Banani.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1z0rDLW4oNG-6S1PgrPxw0sIJXjUy22il',
    tag: 'Completed Masterpiece',
    price: 'Tk 5.8 - 8.2 Crore',
    stats: { beds: '3 Beds', baths: '4 Baths', size: '2,800 - 3,600 Sft' }
  },
  {
    id: 'slide-3',
    title: 'Razia Tower',
    type: 'commercial',
    status: 'ongoing',
    description: 'The future of commercial excellence. Razia Tower is a highly sophisticated, Grade-A smart office tower offering multi-tiered structural redundancy, high-speed capsule elevators, and spectacular double-height commercial lobbies.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XwSyxMxjuTIj8IDAoAjfwv1o_pbAVvMV',
    tag: 'Premium Commercial',
    price: 'Price on Request',
    stats: { levels: '30 Floors', parking: '5 Basements', size: '4,500 - 15,000 Sft' }
  },
  {
    id: 'slide-4',
    title: 'Josna Nir',
    type: 'residential',
    status: 'upcoming',
    description: 'Indulge in ultra-exclusive residential living. Set in the highly secured Baridhara Diplomatic Zone, these select luxury penthouses boast private lap pools, vast botanical sky gardens, and state-of-the-art security integration.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1xZ7UnlKaachkZH2D6LWhAm_fNZrfKTYx',
    tag: 'Upcoming Signature',
    price: 'Tk 12.0 - 18.5 Crore',
    stats: { beds: '4 Beds', baths: '5 Baths', size: '4,500 - 6,200 Sft' }
  }
];

const defaultGroupConcerns = [
  { 
    id: 'concern-1', 
    num: '01', 
    name: 'Madina Properties & Housing Ltd', 
    desc: 'Real Estate & Land Development — Est. 1989',
    established: '1989',
    phone: '+8801713401405',
    email: 'madina.properties@moon-bd.com',
    address: 'Mizan Tower, Mirpur Road, Kallyanpur, Dhaka-1207',
    website: 'https://www.madinaproperties.com',
    aboutText: 'The foundational real estate wing of Moon Group, establishing prestigious residential projects, secure luxury apartment complexes, and high-standard gated communities across Bangladesh. For over three decades, we have shaped the modern landscape of Dhaka with visual landmarks and structural perfection.',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=800'
    ],
    features: ['35+ Luxury Developments Completed', 'Strategic Gated Communities', 'Fully Legal & RAJUK Approved Land', 'Eco-friendly Green Building Designs']
  },
  { 
    id: 'concern-2', 
    num: '02', 
    name: 'The Moon Construction', 
    desc: 'Heavy Civil Infrastructure & Engineering',
    established: '1992',
    phone: '+8801712345671',
    email: 'construction@moon-bd.com',
    address: 'Plot 12, Road 11, Block H, Banani, Dhaka',
    website: 'https://www.moonconstruction.com',
    aboutText: 'Our main heavy engineering division, constructing major roads, high-grade bridges, commercial towers, and multi-story institutional structures under BUET guidelines and rigorous government-level testing standards.',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=800'
    ],
    features: ['State-of-the-Art Batching Plants', 'In-house Concrete Quality Labs', 'Over 150km of Highways Completed', 'Collaborations with International Consultants']
  },
  { 
    id: 'concern-3', 
    num: '03', 
    name: 'Bidhilipi Constructions Ltd', 
    desc: 'Commercial Developments & Corporate Assets',
    established: '1998',
    phone: '+8801712345672',
    email: 'bidhilipi@moon-bd.com',
    address: 'Kamal Ataturk Avenue, Banani, Dhaka-1213',
    website: 'https://www.bidhilipi.com',
    aboutText: 'Specializes in iconic multi-tenant commercial centers, shopping complexes, and state-of-the-art office assets designed for local corporate leaders and international enterprises seeking premier Grade-A work environments.',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fm=jpg&q=80&w=800'
    ],
    features: ['Grade-A Smart Workspace Towers', 'High-speed Intelligent Elevators', 'Double-height Reception Lobbies', 'LEED-certified Structural Layouts']
  },
  { 
    id: 'concern-4', 
    num: '04', 
    name: 'Sun Moon Star Real Estate Int\'l', 
    desc: 'Premium Housing & Luxury Living — Est. 2003',
    established: '2003',
    phone: '+8801712345673',
    email: 'luxury@moon-bd.com',
    address: 'Road 54, Sector 1, Block F, Gulshan 2, Dhaka',
    website: 'https://www.sunmoonstar.com',
    aboutText: 'Redefining the standards of ultimate luxury residential communities. Sun Moon Star incorporates smart-home automation, high-end recreational clubhouses, infinity pools, and sustainable therapeutic botanical garden layouts.',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?fm=jpg&q=80&w=800'
    ],
    features: ['Premium Italian Marble Finishes', 'Rooftop Infinity Swimming Pools', '24/7 Multi-Tier Biometric Security', 'Exclusive Residents Clubhouses']
  },
  { 
    id: 'concern-5', 
    num: '05', 
    name: 'Moon Bangladesh Limited', 
    desc: 'Global Logistics, Trading & Materials — Est. 1994',
    established: '1994',
    phone: '+8801712345674',
    email: 'trading@moon-bd.com',
    address: 'Kallyanpur Bus Terminal, Mirpur Road, Dhaka',
    website: 'https://www.moonbangladesh.com',
    aboutText: 'Our international trading and chemical supply arm, supporting massive logistics networks, chemical processing, raw material imports, construction aggregates, and critical resource distribution nationwide.',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?fm=jpg&q=80&w=800'
    ],
    features: ['National Inbound Cargo Fleet', 'Import Aggregates For Concrete Production', 'Chemical Warehousing in 4 Districts', 'Bulk Distribution Partnerships']
  },
  { 
    id: 'concern-6', 
    num: '06', 
    name: 'Moon Int\'l Garments & Textile', 
    desc: 'High-Scale Textile Production & Exports',
    established: '2001',
    phone: '+8801712345675',
    email: 'garments@moon-bd.com',
    address: 'Savars Industrial Area, Dhaka',
    website: 'https://www.moontextiles.com',
    aboutText: 'Operating state-of-the-art manufacturing plants supplying major European and North American fashion brands, ensuring highly safe, environmentally friendly production lines and strict ethical labor compliance.',
    gallery: [
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1524295928322-4b986a49ad23?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fm=jpg&q=80&w=800'
    ],
    features: ['100% Export-Oriented Operations', 'Rana Plaza Safety Compliant', 'Oeko-Tex Certified Dyeing Units', 'Annual Production of 12M+ Units']
  },
  { 
    id: 'concern-7', 
    num: '07', 
    name: 'Sun Moon Star Int\'l Hotel', 
    desc: 'Luxury Corporate Hospitality & Fine Dining',
    established: '2010',
    phone: '+88029881122',
    email: 'hotel@moon-bd.com',
    address: 'Road 11, Banani, Dhaka-1213',
    website: 'https://www.sms-hotel.com',
    aboutText: 'Delivering five-star business hospitality, high-end corporate banquet facilities, luxury international suites, health club centers, and fine culinary experiences for international travelers and foreign corporate delegations.',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?fm=jpg&q=80&w=800'
    ],
    features: ['120 Multi-room Luxury Suites', 'Rooftop Helipad & Sky Lounge', 'Fully Equipped Convention Center', 'Michelin-inspired Restaurants']
  },
  { 
    id: 'concern-8', 
    num: '08', 
    name: 'South Bangla Agriculture & Commerce Bank', 
    desc: 'Banking, Trade Finance & Synergies',
    established: '2013',
    phone: '+8802223384501',
    email: 'info@sbacbank.com',
    address: 'BSCIC Bhaban, 37/A Dilkusha C/A, Dhaka-1000',
    website: 'https://www.sbacbank.com',
    aboutText: 'Strong capital and institutional investment partner, facilitating fast-track construction financing, home loan options, export-import facilities, and international trade finance operations for Moon Group developments.',
    gallery: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?fm=jpg&q=80&w=800'
    ],
    features: ['85+ Branches Across Bangladesh', 'Fast-Track Construction Finance', 'Custom Home Loan Portfolios', 'Advanced Digital Corporate Banking']
  }
];

const defaultDbData = {
  siteSettings: defaultSiteSettings,
  properties: defaultProperties,
  aboutUs: defaultAboutUs,
  heroSlides: defaultHeroSlides,
  groupConcerns: defaultGroupConcerns,
  testimonials: [],
  bookings: [],
  inquiries: [],
  partnerships: []
};

// Helper to read DB
function readDb(): typeof defaultDbData {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDbData, null, 2), 'utf8');
      return defaultDbData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(data);
    
    // Ensure all required keys exist
    const merged = { ...defaultDbData, ...parsed };
    if (!merged.properties || merged.properties.length === 0) {
      merged.properties = defaultProperties;
    }
    if (!merged.heroSlides || merged.heroSlides.length === 0) {
      merged.heroSlides = defaultHeroSlides;
    }
    if (!merged.groupConcerns || merged.groupConcerns.length === 0) {
      merged.groupConcerns = defaultGroupConcerns;
    }
    return merged;
  } catch (err) {
    console.error('Error reading DB_FILE:', err);
    return defaultDbData;
  }
}

// Helper to write DB
function writeDb(dbData: any): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing DB_FILE:', err);
  }
}

async function startServer() {
  const app = express();

  // Increase payload limit for base64 image uploads & rich floor plans
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  // Initialize DB file on boot if needed
  readDb();

  // ==================== REST API ROUTES ====================

  // GET Supabase SQL Setup helper
  app.get('/api/cms/supabase-sql', (req, res) => {
    const sql = `
-- COPY & RUN THIS IN SUPABASE SQL EDITOR (https://supabase.com/dashboard/project/lxxelzbkygsghqbzqius/sql/new)

CREATE TABLE IF NOT EXISTS public.cms_store (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security and Allow Public Read/Write
ALTER TABLE public.cms_store ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anon all" ON public.cms_store;
CREATE POLICY "Allow anon all" ON public.cms_store FOR ALL USING (true) WITH CHECK (true);
`;
    res.json({ success: true, sql });
  });

  // GET All CMS Data
  app.get('/api/cms/all', async (req, res) => {
    const db = readDb();
    const remoteSiteSettings = await loadFromSupabase('siteSettings');
    const remoteProperties = await loadFromSupabase('properties');
    const remoteAboutUs = await loadFromSupabase('aboutUs');
    const remoteHeroSlides = await loadFromSupabase('heroSlides');
    const remoteGroupConcerns = await loadFromSupabase('groupConcerns');
    const remoteTestimonials = await loadFromSupabase('testimonials');

    if (remoteSiteSettings) db.siteSettings = { ...db.siteSettings, ...remoteSiteSettings };
    if (remoteProperties) db.properties = remoteProperties;
    if (remoteAboutUs) db.aboutUs = { ...db.aboutUs, ...remoteAboutUs };
    if (remoteHeroSlides) db.heroSlides = remoteHeroSlides;
    if (remoteGroupConcerns) db.groupConcerns = remoteGroupConcerns;
    if (remoteTestimonials) db.testimonials = remoteTestimonials;

    writeDb(db);
    res.json({ success: true, data: db });
  });

  // GET Site Settings
  app.get('/api/cms/site-settings', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('siteSettings');
    if (remote) {
      db.siteSettings = { ...db.siteSettings, ...remote };
      writeDb(db);
    }
    res.json({ success: true, data: db.siteSettings });
  });

  // POST Site Settings
  app.post('/api/cms/site-settings', async (req, res) => {
    const db = readDb();
    db.siteSettings = { ...db.siteSettings, ...req.body };
    writeDb(db);
    saveToSupabase('siteSettings', db.siteSettings);
    res.json({ success: true, data: db.siteSettings });
  });

  // GET Properties
  app.get('/api/cms/properties', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('properties');
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.properties = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.properties });
  });

  // POST Property (Create / Update)
  app.post('/api/cms/properties', async (req, res) => {
    const db = readDb();
    const prop = req.body;
    if (!prop || !prop.id) {
      return res.status(400).json({ success: false, message: 'Invalid property payload' });
    }
    const idx = db.properties.findIndex((p: any) => p.id === prop.id);
    if (idx >= 0) {
      db.properties[idx] = prop;
    } else {
      db.properties.unshift(prop);
    }
    writeDb(db);
    saveToSupabase('properties', db.properties);
    res.json({ success: true, data: prop });
  });

  // DELETE Property
  app.delete('/api/cms/properties/:id', async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    db.properties = db.properties.filter((p: any) => p.id !== id);
    writeDb(db);
    saveToSupabase('properties', db.properties);
    res.json({ success: true, id });
  });

  // GET About Us
  app.get('/api/cms/about', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('aboutUs');
    if (remote) {
      db.aboutUs = { ...db.aboutUs, ...remote };
      writeDb(db);
    }
    res.json({ success: true, data: db.aboutUs });
  });

  // POST About Us
  app.post('/api/cms/about', async (req, res) => {
    const db = readDb();
    db.aboutUs = { ...db.aboutUs, ...req.body };
    writeDb(db);
    saveToSupabase('aboutUs', db.aboutUs);
    res.json({ success: true, data: db.aboutUs });
  });

  // GET Hero Slides
  app.get('/api/cms/slides', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('heroSlides');
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.heroSlides = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.heroSlides });
  });

  // POST Hero Slide
  app.post('/api/cms/slides', async (req, res) => {
    const db = readDb();
    const slide = req.body;
    if (!slide || !slide.id) {
      return res.status(400).json({ success: false, message: 'Invalid slide payload' });
    }
    const idx = db.heroSlides.findIndex((s: any) => s.id === slide.id);
    if (idx >= 0) {
      db.heroSlides[idx] = slide;
    } else {
      db.heroSlides.push(slide);
    }
    writeDb(db);
    saveToSupabase('heroSlides', db.heroSlides);
    res.json({ success: true, data: slide });
  });

  // DELETE Hero Slide
  app.delete('/api/cms/slides/:id', async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    db.heroSlides = db.heroSlides.filter((s: any) => s.id !== id);
    writeDb(db);
    saveToSupabase('heroSlides', db.heroSlides);
    res.json({ success: true, id });
  });

  // GET Group Concerns
  app.get('/api/cms/concerns', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('groupConcerns');
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.groupConcerns = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.groupConcerns });
  });

  // POST Group Concern
  app.post('/api/cms/concerns', async (req, res) => {
    const db = readDb();
    const concern = req.body;
    if (!concern || !concern.id) {
      return res.status(400).json({ success: false, message: 'Invalid concern payload' });
    }
    const idx = db.groupConcerns.findIndex((c: any) => c.id === concern.id);
    if (idx >= 0) {
      db.groupConcerns[idx] = concern;
    } else {
      db.groupConcerns.push(concern);
    }
    writeDb(db);
    saveToSupabase('groupConcerns', db.groupConcerns);
    res.json({ success: true, data: concern });
  });

  // DELETE Group Concern
  app.delete('/api/cms/concerns/:id', async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    db.groupConcerns = db.groupConcerns.filter((c: any) => c.id !== id);
    writeDb(db);
    saveToSupabase('groupConcerns', db.groupConcerns);
    res.json({ success: true, id });
  });

  // GET Testimonials
  app.get('/api/cms/testimonials', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('testimonials');
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.testimonials = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.testimonials });
  });

  // POST Testimonial
  app.post('/api/cms/testimonials', async (req, res) => {
    const db = readDb();
    const item = req.body;
    if (!item || !item.id) {
      return res.status(400).json({ success: false, message: 'Invalid testimonial payload' });
    }
    const idx = db.testimonials.findIndex((t: any) => t.id === item.id);
    if (idx >= 0) {
      db.testimonials[idx] = item;
    } else {
      db.testimonials.push(item);
    }
    writeDb(db);
    saveToSupabase('testimonials', db.testimonials);
    res.json({ success: true, data: item });
  });

  // DELETE Testimonial
  app.delete('/api/cms/testimonials/:id', async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    db.testimonials = db.testimonials.filter((t: any) => t.id !== id);
    writeDb(db);
    saveToSupabase('testimonials', db.testimonials);
    res.json({ success: true, id });
  });

  // POST Booking
  app.post('/api/cms/bookings', async (req, res) => {
    const db = readDb();
    const booking = { id: `book_${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
    db.bookings.unshift(booking);
    writeDb(db);
    saveToSupabase('bookings', db.bookings);
    res.json({ success: true, data: booking });
  });

  // GET Bookings
  app.get('/api/cms/bookings', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('bookings');
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.bookings = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.bookings });
  });

  // POST Inquiry
  app.post('/api/cms/inquiries', async (req, res) => {
    const db = readDb();
    const inquiry = { id: `inq_${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
    db.inquiries.unshift(inquiry);
    writeDb(db);
    saveToSupabase('inquiries', db.inquiries);
    res.json({ success: true, data: inquiry });
  });

  // GET Inquiries
  app.get('/api/cms/inquiries', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('inquiries');
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.inquiries = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.inquiries });
  });

  // POST Partnerships
  app.post('/api/cms/partnerships', async (req, res) => {
    const db = readDb();
    const item = { id: `part_${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
    db.partnerships.unshift(item);
    writeDb(db);
    saveToSupabase('partnerships', db.partnerships);
    res.json({ success: true, data: item });
  });

  // GET Partnerships
  app.get('/api/cms/partnerships', async (req, res) => {
    const db = readDb();
    const remote = await loadFromSupabase('partnerships');
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.partnerships = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.partnerships });
  });

  // ==================== VITE & STATIC FILES ====================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Moon Group Express Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
