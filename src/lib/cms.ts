/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db, withTimeout, isQuotaExceeded, markQuotaExceeded } from './firebase';
import { Property, VisitBooking, LandownerPartnerSubmission } from '../types';
import { properties as defaultProperties } from '../data/properties';
import { processObjectImagesForSave, processObjectImagesForLoad } from './imageChunker';

// Firebase Client-side cloud store fallbacks
async function saveToFirebaseCloud(key: string, data: any): Promise<boolean> {
  if (isQuotaExceeded()) return false;
  try {
    const docRef = doc(db, 'cms_store', key);
    await withTimeout(setDoc(docRef, {
      value: data,
      updated_at: new Date().toISOString()
    }), 10000, true);
    return true;
  } catch (err) {
    const errMsg = String((err as any)?.message || err || '');
    const code = String((err as any)?.code || '');
    if (errMsg.includes('NOT_FOUND') || code === 'not-found' || code === '5') {
      markQuotaExceeded();
    }
    ; // Muted cms write warning
    return false;
  }
}

async function loadFromFirebaseCloud(key: string): Promise<any | null> {
  if (isQuotaExceeded()) return null;
  try {
    const docRef = doc(db, 'cms_store', key);
    const snap = await withTimeout(getDoc(docRef), 10000, true);
    if (snap && snap.exists()) {
      return snap.data()?.value || null;
    }
  } catch (err) {
    const errMsg = String((err as any)?.message || err || '');
    const code = String((err as any)?.code || '');
    if (errMsg.includes('NOT_FOUND') || code === 'not-found' || code === '5') {
      markQuotaExceeded();
    }
    ; // Muted cms fetch warning
  }
  return null;
}

async function fetchJsonSafely(url: string, options?: RequestInit): Promise<any> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return { success: false };
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return { success: false };
    }
    return await res.json();
  } catch {
    return { success: false };
  }
}
import { 
  savePropertyToLocalStorage, 
  getPropertiesFromLocalStorage, 
  removePropertyFromLocalStorage,
  saveSiteSettingsToLocalStorage,
  getSiteSettingsFromLocalStorage,
  saveSlideToLocalStorage,
  getSlidesFromLocalStorage,
  removeSlideFromLocalStorage,
  getDeletedSlideIdsFromLocalStorage,
  saveAboutUsToLocalStorage,
  getAboutUsFromLocalStorage,
  saveGroupConcernToLocalStorage,
  getGroupConcernsFromLocalStorage,
  removeGroupConcernFromLocalStorage,
  saveTestimonialToLocalStorage,
  getTestimonialsFromLocalStorage,
  removeTestimonialFromLocalStorage
} from './indexedDbStorage';


// Default dynamic content definitions
export interface CMSAboutUs {
  id: string;
  tagline: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
  imageFit?: "cover" | "contain" | "fill" | "scale-down";
  imagePosition?: string;
  yearFounded: number;
  sisterConcernsCount: number;
  sectorsActiveCount: number;
}

export interface CMSHeroSlide {
  id: string;
  title: string;
  type: 'residential' | 'commercial';
  status: 'ongoing' | 'upcoming' | 'completed' | 'proposed' | 'under-construction';
  description: string;
  imageUrl: string;
  imageFit?: "cover" | "contain" | "fill" | "scale-down";
  imagePosition?: string;
  tag: string;
  price: string;
  stats: {
    beds?: string;
    baths?: string;
    levels?: string;
    parking?: string;
    size: string;
  };
  location?: string;
}

export interface CMSGroupConcern {
  id: string;
  num: string;
  name: string;
  desc: string;
  gallery?: string[];
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  aboutText?: string;
  established?: string;
  features?: string[];
}

export interface CMSTestimonial {
  id: string;
  category: string;
  image: string;
  quote: string;
  author: string;
  role: string;
  project: string;
  rating?: number;
  createdAt?: string;
}

export interface CMSSiteSettings {
  id: string;
  tickerText: string;
  hotlinePhone: string;
  whatsappPhone: string;
  emailAddress: string;
  headOffice: string;
  facebookLink: string;
  linkedinLink: string;
  twitterLink?: string;
  instagramLink: string;
  youtubeLink: string;
  brandName: string;
  tagline: string;
  rehabRegNo?: string;
  rajukCodeNo?: string;
  telephoneNumbers?: string;
  copyrightText?: string;
  showVirtualConfigurator?: boolean;
  showHavenTowerBanner?: boolean;
  havenTowerBannerImage?: string;
  havenTowerTitle?: string;
  havenTowerDescription?: string;
  havenTowerStatusLabel?: string;
  havenTowerStatusValue?: string;
  havenTowerPriceLabel?: string;
  havenTowerPriceValue?: string;
  havenTowerLocation?: string;
  havenTowerSizes?: string;
  havenTowerHighlights?: string;
  tickerSpeed?: number;
  portfolioSubheading?: string;
  portfolioHeading?: string;
  portfolioDescription?: string;
}

// Default values for seeding
const defaultSiteSettings: CMSSiteSettings = {
  id: 'main',
  tickerText: '📢 বিশেষ বিজ্ঞপ্তি: হেভেন টাওয়ার (HEAVEN TOWER) উদ্বোধন হয়েছে - বুকিং ও সেল চলছে! 🏢 ✦ 🔥 HEAVEN TOWER INAUGURATED - BOOKING & SALES NOW OPEN! ✦ REAL ESTATE ✦ HOUSING ✦ CONSTRUCTION ✦ INTERIORS ✦ COMMERCIAL SPACES ✦ SINCE 1983 ✦',
  hotlinePhone: '+88 02 9009153',
  whatsappPhone: '+8801313401405',
  emailAddress: 'sales@moongroupltd.com',
  headOffice: '1/5 Mizan Tower, 2nd Floor, Kallyanpur, Dhaka',
  facebookLink: 'https://facebook.com',
  linkedinLink: 'https://linkedin.com',
  twitterLink: 'https://twitter.com',
  instagramLink: 'https://instagram.com',
  youtubeLink: 'https://youtube.com',
  brandName: 'MOON GROUP OF INDUSTRIES LTD',
  tagline: 'Building Bangladesh\'s homes and premium skylines since 1983.',
  rehabRegNo: 'Member 228/2005',
  rajukCodeNo: 'Code # DL-3215',
  telephoneNumbers: '0241002945, 0241002946, 0241002947, 0241002948, 0241002949, 0241002951, 0241000182',
  copyrightText: '© 2026 Moon Builders — Moon Group of Industries. All rights reserved.',
  showVirtualConfigurator: true,
  showHavenTowerBanner: true,
  havenTowerBannerImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  havenTowerTitle: 'HEAVEN TOWER',
  havenTowerDescription: '📢 হেভেন টাওয়ার (HEAVEN TOWER) এর উদ্বোধন সম্পন্ন হয়েছে - বর্তমানে বুকিং এবং সেল চলছে! আকর্ষণীয় আর্কিটেকচার, ডাবল-হাইট এট্রিয়াম লবি, রুফটপ ইনফিনিটি পুল এবং Zone-4 ভূমিকম্প প্রতিরোধী স্ট্রাকচার বিশিষ্ট মুন গ্রুপের ফ্ল্যাগশিপ প্রজেক্ট।',
  havenTowerStatusLabel: 'Project Status',
  havenTowerStatusValue: 'Booking & Sales Open',
  havenTowerPriceLabel: 'Launch Rate',
  havenTowerPriceValue: 'Tk 2.2 - 5.5 Cr',
  havenTowerLocation: 'Plot 01, Section 12, Mirpur / Prime Location, Dhaka',
  havenTowerSizes: 'A- 4293 Sft | B- 3000 Sft | C- 3000 Sft | D- 3770 Sft',
  havenTowerHighlights: '25-Story Iconic Landmark Architecture\nGrand Double-Height Entrance Atrium Lobby\nRooftop Sky Infinity Pool & Botanical Lounge\nZone-4 Earthquake Resistant Certified Structure\nHigh-Speed Intelligent Elevators & 100% Power Backup\nSmart Home Automation with Biometric Security',
  tickerSpeed: 28,
  portfolioSubheading: '★ CINEMATIC PORTFOLIO SHOWCASE',
  portfolioHeading: 'Interactive Master Gallery',
  portfolioDescription: 'Explore our architectural achievements on a massive interactive canvas. Flanked symmetrically by beautiful custom project panels, view raw hi-definition imagery using cutting-edge 3D transitions.'
};

// Default values for seeding
const defaultAboutUs: CMSAboutUs = {
  id: 'main',
  tagline: 'A Legacy Since 1983',
  title: 'FOUR DECADES OF\nBUILDING TRUST.',
  paragraph1: 'Moon Builders is the construction and real estate arm of Moon Group of Industries, founded in 1983 under the visionary leadership of Al-haj Mizanur Rahman. What began with a single housing venture has grown into a conglomerate spanning real estate, housing, construction, textiles, hospitality, and agriculture — with the exact same site discipline applied on every project, big or small.',
  paragraph2: 'We handle the full span of delivery: land assessment, structural engineering, on-site raw material quality control, and timely handover. Our promise is simple: what is drafted on paper is precisely what stands on the ground.',
  imageUrl: 'https://images.unsplash.com/photo-1609867271967-a82f85c48531?fm=jpg&q=70&w=1400&auto=format&fit=crop',
  yearFounded: 1983,
  sisterConcernsCount: 19,
  sectorsActiveCount: 11,
};

export const defaultHeroSlides: CMSHeroSlide[] = [
  {
    id: 'haven-tower',
    title: 'Heaven Tower',
    type: 'residential',
    status: 'ongoing',
    description: '★ MAIN ATTRACTION - HEAVEN TOWER INAUGURATED! Moon Group’s flagship architectural masterpiece featuring double-height atrium lobby, rooftop sky infinity pool, high-speed elevators, Zone-4 earthquake resistance, and smart home luxury. Booking & sales now open!',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
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

const defaultGroupConcerns: CMSGroupConcern[] = [
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
  },
  { 
    id: 'concern-9', 
    num: '09', 
    name: 'The Daily Bartoman', 
    desc: 'National Bengali Daily Newspaper',
    established: '2013',
    phone: '+8802223384501',
    email: 'info@dailybartoman.com',
    address: 'Sun Moon Star Tower, 37 Dilkusha C/A, Dhaka-1000',
    website: 'https://dailybartoman.com/',
    aboutText: 'The Daily Bartoman (দৈনিক বর্তমান) is a prominent and influential national Bengali daily newspaper of Bangladesh. Headquartered in our iconic Sun Moon Star Tower in Dilkusha C/A, it provides modern, reliable, and real-time news reporting across politics, economics, community, and global events.',
    gallery: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?fm=jpg&q=80&w=800'
    ],
    features: ['Leading Bengali National Daily', 'Dilkusha Commercial Area HQ', 'Advanced Digital and Print Distribution', 'Trusted Nationwide News Outlet']
  },
  { 
    id: 'concern-10', 
    num: '10', 
    name: 'Moon International Printing Press Ltd', 
    desc: 'Industrial & Commercial Printing Press Services',
    established: '2005',
    phone: '+8801713401405',
    email: 'press@moon-bd.com',
    address: 'Mograkanda, Aminbazar, Savar, Dhaka',
    website: 'https://dailybartoman.com',
    aboutText: 'Moon International Printing Press Ltd. is our advanced commercial publishing and industrial printing wing, operating high-efficiency offset and digital printers in Aminbazar. It specializes in newspaper printing, book bindings, high-grade packaging, and corporate materials.',
    gallery: [
      'https://images.unsplash.com/photo-1606253524114-1e5b12da61c5?fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?fm=jpg&q=80&w=800'
    ],
    features: ['High-Capacity Offset Printing Presses', 'Advanced Color Calibration Systems', 'Aminbazar Industrial Hub Location', 'Eco-friendly Materials & Ink Standards']
  }
];

/**
 * Seed database with default content if collections are completely empty.
 */
export async function seedCMSDatabaseIfNeeded() {
  // Database seeding is managed safely by the server (server.ts) and IndexedDB cache
  return;
}

function normalizeSiteSettings(settings: CMSSiteSettings): CMSSiteSettings {
  const s = { ...settings };
  if (s.rehabRegNo === "Reg # 1452/2012" || !s.rehabRegNo) {
    s.rehabRegNo = "Member 228/2005";
  }
  if (s.tagline && s.tagline.includes("1989")) {
    s.tagline = s.tagline.replace(/1989/g, "1983");
  }
  if (s.tickerText && s.tickerText.includes("1989")) {
    s.tickerText = s.tickerText.replace(/1989/g, "1983");
  }
  if (s.havenTowerBannerImage === '/haven_tower/img_4.jpg') {
    s.havenTowerBannerImage = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
  }
  return s;
}

/**
 * Fetch Site Settings dynamic configuration.
 */
export async function getCMSSiteSettings(): Promise<CMSSiteSettings> {
  const localSettings = await getSiteSettingsFromLocalStorage();
  try {
    const json = await fetchJsonSafely(`/api/cms/site-settings?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (json.success && json.data) {
      const merged = normalizeSiteSettings({ ...defaultSiteSettings, ...json.data });
      await saveSiteSettingsToLocalStorage(merged);
      return await processObjectImagesForLoad(merged);
    }
  } catch (err) {
    console.warn('Server API site settings fetch notice, trying Firebase direct fallback', err);
  }

  // Try direct Firebase fetch
  try {
    const val = await loadFromFirebaseCloud('siteSettings');
    if (val) {
      const merged = normalizeSiteSettings({ ...defaultSiteSettings, ...val });
      await saveSiteSettingsToLocalStorage(merged);
      return await processObjectImagesForLoad(merged);
    }
  } catch (err) {
    console.warn('Direct Firebase site settings load exception:', err);
  }

  if (isQuotaExceeded()) {
    const merged = normalizeSiteSettings({ ...defaultSiteSettings, ...(localSettings || {}) });
    return await processObjectImagesForLoad(merged);
  }
  try {
    const snap = await withTimeout(getDoc(doc(db, 'site_settings', 'main')), 4000, true);
    if (snap.exists()) {
      const remoteData = snap.data() as CMSSiteSettings;
      const merged = normalizeSiteSettings({ ...defaultSiteSettings, ...(localSettings || {}), ...remoteData });
      await saveSiteSettingsToLocalStorage(merged);
      return await processObjectImagesForLoad(merged);
    }
    const merged = normalizeSiteSettings({ ...defaultSiteSettings, ...(localSettings || {}) });
    return await processObjectImagesForLoad(merged);
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Failed to fetch Site Settings from Firebase. Using local fallback.', error);
    const merged = normalizeSiteSettings({ ...defaultSiteSettings, ...(localSettings || {}) });
    return await processObjectImagesForLoad(merged);
  }
}

/**
 * Save Site Settings data.
 */
export async function saveCMSSiteSettings(data: CMSSiteSettings): Promise<void> {
  // 1. Save locally in browser
  await saveSiteSettingsToLocalStorage(data);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 2. Direct Firestore SDK write
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(data, 'site_settings_main');
      await withTimeout(setDoc(doc(db, 'site_settings', 'main'), prepared), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for Site Settings:', err);
    }
  }

  // 3. Save to Express Backend Server (if running in full-stack mode)
  try {
    const res = await fetch('/api/cms/site-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API server not present on static hosting
  }

  // 4. Direct Firebase Fallback Store Write
  firebaseSucceeded = await saveToFirebaseCloud('siteSettings', data);

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn('Notice: Site Settings saved locally in browser storage.');
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Fetch all properties. Fallback to local storage or default if error.
 */
export async function getCMSProperties(): Promise<Property[]> {
  const localProps = await getPropertiesFromLocalStorage();

  try {
    const json = await fetchJsonSafely(`/api/cms/properties?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      const resolvedDocs = await Promise.all(
        json.data.map((doc: any) => processObjectImagesForLoad(doc))
      );

      // Merge with localProps to safeguard any locally uploaded images
      const localMap = new Map<string, Property>();
      if (localProps && Array.isArray(localProps)) {
        localProps.forEach(p => { if (p && p.id) localMap.set(p.id, p); });
      }

      const merged = resolvedDocs.map(remote => {
        const local = localMap.get(remote.id);
        if (!local) return remote;
        const remoteImg = remote.imageUrl || '';
        const localImg = local.imageUrl || '';
        if (localImg.startsWith('data:image') && !remoteImg.startsWith('data:image')) {
          return { ...remote, ...local, imageUrl: localImg };
        }
        return remote;
      });

      for (const p of merged) {
        await savePropertyToLocalStorage(p);
      }
      return merged.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
    }
  } catch (err) {
    console.warn('Server API properties fetch notice, trying Firebase fallback', err);
  }

  // Try direct Firebase fetch
  try {
    const val = await loadFromFirebaseCloud('properties');
    if (val && Array.isArray(val)) {
      const resolvedDocs = await Promise.all(
        val.map((doc: any) => processObjectImagesForLoad(doc))
      );
      for (const p of resolvedDocs) {
        await savePropertyToLocalStorage(p);
      }
      return resolvedDocs.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
    }
  } catch (err) {
    console.warn('Direct Firebase properties load exception:', err);
  }

  if (isQuotaExceeded()) {
    const propertyMap = new Map<string, Property>();
    if (localProps && localProps.length > 0) {
      localProps.forEach(p => propertyMap.set(p.id, p));
    } else {
      defaultProperties.forEach(p => propertyMap.set(p.id, p));
    }
    const merged = Array.from(propertyMap.values());
    return merged.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
  }

  try {
    const snap = await withTimeout(getDocs(collection(db, 'properties')), 4000, true);
    let docs: Property[] = [];
    if (!snap.empty) {
      docs = snap.docs.map(d => d.data() as Property);
    } else {
      docs = [...defaultProperties];
    }
    const hasHaven = docs.some(p => p.id === 'haven-tower');
    if (!hasHaven) {
      const havenProp = defaultProperties.find(p => p.id === 'haven-tower');
      if (havenProp) {
        docs.push(havenProp);
      }
    }
    
    const resolvedDocs = await Promise.all(
      docs.map(doc => processObjectImagesForLoad(doc))
    );

    for (const p of resolvedDocs) {
      await savePropertyToLocalStorage(p);
    }

    return resolvedDocs.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Failed to fetch properties from Firebase. Using local fallbacks.', error);
    const propertyMap = new Map<string, Property>();
    if (localProps && localProps.length > 0) {
      localProps.forEach(p => propertyMap.set(p.id, p));
    } else {
      defaultProperties.forEach(p => propertyMap.set(p.id, p));
    }
    const merged = Array.from(propertyMap.values());
    return merged.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
  }
}

/**
 * Save/Update property in Server, LocalStorage and Firebase safely.
 */
export async function saveCMSProperty(property: Property): Promise<void> {
  await savePropertyToLocalStorage(property);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK write
  if (!isQuotaExceeded()) {
    try {
      const preparedProperty = await processObjectImagesForSave(property, `prop_${property.id}`);
      await withTimeout(setDoc(doc(db, 'properties', property.id), preparedProperty), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore property write notice:', err);
    }
  }

  // 2. Express Backend API call (if running on server)
  try {
    const res = await fetch('/api/cms/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property)
    });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Fallback single-document store write
  try {
    let currentList = await loadFromFirebaseCloud('properties');
    if (!currentList || !Array.isArray(currentList)) {
      currentList = [...defaultProperties];
    }
    const idx = currentList.findIndex((p: any) => p.id === property.id);
    if (idx >= 0) currentList[idx] = property;
    else currentList.push(property);

    firebaseSucceeded = await saveToFirebaseCloud('properties', currentList);
  } catch (err: any) {
    // Fallback store notice
  }

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn(`Notice: Property ${property.id} saved locally in browser storage.`);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Delete property from Server, LocalStorage and Firebase.
 */
export async function deleteCMSProperty(id: string): Promise<void> {
  removePropertyFromLocalStorage(id);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK Delete
  if (!isQuotaExceeded()) {
    try {
      await withTimeout(deleteDoc(doc(db, 'properties', id)), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore delete notice:', err);
    }
  }

  // 2. Express Backend API call (if present)
  try {
    const res = await fetch(`/api/cms/properties/${id}`, { method: 'DELETE' });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Direct Firebase Fallback Store Delete
  try {
    let currentList = await loadFromFirebaseCloud('properties');
    if (!currentList || !Array.isArray(currentList)) {
      currentList = [...defaultProperties];
    }
    const updatedList = currentList.filter((p: any) => p.id !== id);

    firebaseSucceeded = await saveToFirebaseCloud('properties', updatedList);
  } catch (err: any) {
    // Fallback delete notice
  }
  
  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn(`Notice: Property ${id} deleted locally from browser storage.`);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

function normalizeAboutUs(about: CMSAboutUs): CMSAboutUs {
  const a = { ...about };
  if (a.tagline === "A Legacy Since 1989" || !a.tagline) {
    a.tagline = "A Legacy Since 1983";
  }
  if (a.paragraph1 && a.paragraph1.includes("1989")) {
    a.paragraph1 = a.paragraph1.replace(/1989/g, "1983");
  }
  if (a.yearFounded === 1989) {
    a.yearFounded = 1983;
  }
  return a;
}

/**
 * Fetch About Us dynamic configuration.
 */
export async function getCMSAboutUs(): Promise<CMSAboutUs> {
  const local = await getAboutUsFromLocalStorage();

  try {
    const json = await fetchJsonSafely(`/api/cms/about?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (json.success && json.data) {
      const loaded = await processObjectImagesForLoad(json.data);
      const merged = normalizeAboutUs({ ...defaultAboutUs, ...loaded });
      await saveAboutUsToLocalStorage(merged);
      return merged;
    }
  } catch (err) {
    console.warn('Server API about us fetch notice, trying Firebase fallback', err);
  }

  // Try direct Firebase fetch
  try {
    const val = await loadFromFirebaseCloud('aboutUs');
    if (val) {
      const loaded = await processObjectImagesForLoad(val);
      const merged = normalizeAboutUs({ ...defaultAboutUs, ...loaded });
      await saveAboutUsToLocalStorage(merged);
      return merged;
    }
  } catch (err) {
    console.warn('Direct Firebase aboutUs load exception:', err);
  }

  if (isQuotaExceeded()) {
    return normalizeAboutUs(local || defaultAboutUs);
  }
  try {
    const snap = await withTimeout(getDoc(doc(db, 'about_us', 'main')), 4000, true);
    if (snap.exists()) {
      const data = snap.data() as CMSAboutUs;
      const loaded = await processObjectImagesForLoad(data);
      const merged = normalizeAboutUs({ ...defaultAboutUs, ...(local || {}), ...loaded });
      await saveAboutUsToLocalStorage(merged);
      return merged;
    }
    return normalizeAboutUs(local || defaultAboutUs);
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Failed to fetch About Us from Firebase. Using local fallback.', error);
    return normalizeAboutUs(local || defaultAboutUs);
  }
}

/**
 * Save About Us data.
 */
export async function saveCMSAboutUs(data: CMSAboutUs): Promise<void> {
  await saveAboutUsToLocalStorage(data);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK write
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(data, 'about_us');
      await withTimeout(setDoc(doc(db, 'about_us', 'main'), prepared), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for About Us:', err);
    }
  }

  // 2. Express Backend API call (if present)
  try {
    const res = await fetch('/api/cms/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Fallback single-document store write
  firebaseSucceeded = await saveToFirebaseCloud('aboutUs', data);

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn('Notice: About Us saved locally in browser storage.');
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Fetch Hero Slides.
 */
export async function getCMSHeroSlides(): Promise<CMSHeroSlide[]> {
  const localSlides = await getSlidesFromLocalStorage();
  const deletedIds = getDeletedSlideIdsFromLocalStorage();

  try {
    const json = await fetchJsonSafely(`/api/cms/slides?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (json.success && Array.isArray(json.data)) {
      const filtered = json.data.filter((s: any) => s && s.id && !deletedIds.includes(s.id));
      const resolvedSlides = await Promise.all(
        filtered.map((slide: any) => processObjectImagesForLoad(slide))
      );
      saveAllSlidesToLocalStorage(resolvedSlides);
      return resolvedSlides.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
    }
  } catch (err) {
    console.warn('Server API hero slides fetch notice, trying Firebase fallback', err);
  }

  // Try direct Firebase fetch
  try {
    const val = await loadFromFirebaseCloud('heroSlides');
    if (val && Array.isArray(val)) {
      const filtered = val.filter((s: any) => s && s.id && !deletedIds.includes(s.id));
      const resolvedSlides = await Promise.all(
        filtered.map((slide: any) => processObjectImagesForLoad(slide))
      );
      saveAllSlidesToLocalStorage(resolvedSlides);
      return resolvedSlides.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
    }
  } catch (err) {
    console.warn('Direct Firebase hero slides load exception:', err);
  }

  let baseSlides: CMSHeroSlide[] = [];

  if (isQuotaExceeded()) {
    baseSlides = [...defaultHeroSlides];
  } else {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'hero_slides')), 4000, true);
      if (!snap.empty) {
        baseSlides = snap.docs.map(d => d.data() as CMSHeroSlide);
      } else {
        baseSlides = [...defaultHeroSlides];
      }
    } catch (error: any) {
      const errMsg = String(error?.message || error || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Failed to fetch Hero Slides from Firebase. Using local fallback.', error);
      baseSlides = [...defaultHeroSlides];
    }
  }

  baseSlides = baseSlides.filter(s => !deletedIds.includes(s.id));

  const mergedMap = new Map<string, CMSHeroSlide>();
  baseSlides.forEach(s => mergedMap.set(s.id, s));
  localSlides.forEach(s => mergedMap.set(s.id, s));

  const slides = Array.from(mergedMap.values());
  const resolvedSlides = await Promise.all(
    slides.map(slide => processObjectImagesForLoad(slide))
  );

  saveAllSlidesToLocalStorage(resolvedSlides);

  return resolvedSlides.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
}

/**
 * Save/Update Hero Slide.
 */
export async function saveCMSHeroSlide(slide: CMSHeroSlide): Promise<void> {
  await saveSlideToLocalStorage(slide);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK write
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(slide, `slide_${slide.id}`);
      await withTimeout(setDoc(doc(db, 'hero_slides', slide.id), prepared), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for Hero Slide:', err);
    }
  }

  // 2. Express Backend API call (if present)
  try {
    const res = await fetch('/api/cms/slides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slide)
    });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Fallback single-document store write
  try {
    let currentList = await loadFromFirebaseCloud('heroSlides');
    if (!currentList || !Array.isArray(currentList)) {
      currentList = [...defaultHeroSlides];
    }
    const idx = currentList.findIndex((s: any) => s.id === slide.id);
    if (idx >= 0) currentList[idx] = slide;
    else currentList.push(slide);

    firebaseSucceeded = await saveToFirebaseCloud('heroSlides', currentList);
  } catch (err: any) {
    // Fallback store notice
  }

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn(`Notice: Hero slide ${slide.id} saved locally in browser storage.`);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Delete Hero Slide.
 */
export async function deleteCMSHeroSlide(id: string): Promise<void> {
  removeSlideFromLocalStorage(id);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK Delete
  if (!isQuotaExceeded()) {
    try {
      await withTimeout(deleteDoc(doc(db, 'hero_slides', id)), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore delete notice for Hero Slide:', err);
    }
  }

  // 2. Express Backend API call (if present)
  try {
    const res = await fetch(`/api/cms/slides/${id}`, { method: 'DELETE' });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Direct Firebase Fallback Store Delete
  try {
    let currentList = await loadFromFirebaseCloud('heroSlides');
    if (!currentList || !Array.isArray(currentList)) {
      currentList = [...defaultHeroSlides];
    }
    const updatedList = currentList.filter((s: any) => s.id !== id);

    firebaseSucceeded = await saveToFirebaseCloud('heroSlides', updatedList);
  } catch (err: any) {
    // Fallback delete notice
  }

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn(`Notice: Hero slide ${id} deleted locally from browser storage.`);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Fetch Group Concerns / Sister Concerns.
 */
export async function getCMSGroupConcerns(): Promise<CMSGroupConcern[]> {
  const localConcerns = await getGroupConcernsFromLocalStorage();

  try {
    const json = await fetchJsonSafely(`/api/cms/concerns?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (json.success && Array.isArray(json.data)) {
      const resolvedList = await Promise.all(
        json.data.map((c: any) => processObjectImagesForLoad(c))
      );
      for (const c of resolvedList) {
        await saveGroupConcernToLocalStorage(c);
      }
      return resolvedList.sort((a, b) => a.num.localeCompare(b.num));
    }
  } catch (err) {
    console.warn('Server API group concerns fetch notice, trying Firebase fallback', err);
  }

  // Try direct Firebase fetch
  try {
    const val = await loadFromFirebaseCloud('groupConcerns');
    if (val && Array.isArray(val)) {
      const resolvedList = await Promise.all(
        val.map((c: any) => processObjectImagesForLoad(c))
      );
      for (const c of resolvedList) {
        await saveGroupConcernToLocalStorage(c);
      }
      return resolvedList.sort((a, b) => a.num.localeCompare(b.num));
    }
  } catch (err) {
    console.warn('Direct Firebase groupConcerns load exception:', err);
  }

  let base: CMSGroupConcern[] = [];
  if (isQuotaExceeded()) {
    base = [...defaultGroupConcerns];
  } else {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'group_concerns')), 4000, true);
      if (!snap.empty) {
        base = snap.docs.map(d => d.data() as CMSGroupConcern);
      } else {
        base = [...defaultGroupConcerns];
      }
    } catch (error: any) {
      const errMsg = String(error?.message || error || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Failed to fetch Group Concerns from Firebase. Using local fallback.', error);
      base = [...defaultGroupConcerns];
    }
  }

  const mergedMap = new Map<string, CMSGroupConcern>();
  localConcerns.forEach(c => mergedMap.set(c.id, c));
  base.forEach(c => mergedMap.set(c.id, c));

  const list = Array.from(mergedMap.values());
  const resolvedList = await Promise.all(
    list.map(c => processObjectImagesForLoad(c))
  );

  for (const c of resolvedList) {
    await saveGroupConcernToLocalStorage(c);
  }

  return resolvedList.sort((a, b) => a.num.localeCompare(b.num));
}

/**
 * Save/Update Group Concern.
 */
export async function saveCMSGroupConcern(concern: CMSGroupConcern): Promise<void> {
  await saveGroupConcernToLocalStorage(concern);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK write
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(concern, `concern_${concern.id}`);
      await withTimeout(setDoc(doc(db, 'group_concerns', concern.id), prepared), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for Group Concern:', err);
    }
  }

  // 2. Express Backend API call (if present)
  try {
    const res = await fetch('/api/cms/concerns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(concern)
    });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Fallback single-document store write
  try {
    let currentList = await loadFromFirebaseCloud('groupConcerns');
    if (!currentList || !Array.isArray(currentList)) {
      currentList = [...defaultGroupConcerns];
    }
    const idx = currentList.findIndex((c: any) => c.id === concern.id);
    if (idx >= 0) currentList[idx] = concern;
    else currentList.push(concern);

    firebaseSucceeded = await saveToFirebaseCloud('groupConcerns', currentList);
  } catch (err: any) {
    // Fallback store notice
  }

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn(`Notice: Group Concern ${concern.id} saved locally in browser storage.`);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Delete Group Concern.
 */
export async function deleteCMSGroupConcern(id: string): Promise<void> {
  removeGroupConcernFromLocalStorage(id);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK Delete
  if (!isQuotaExceeded()) {
    try {
      await withTimeout(deleteDoc(doc(db, 'group_concerns', id)), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore delete notice for Group Concern:', err);
    }
  }

  // 2. Express Backend API call (if present)
  try {
    const res = await fetch(`/api/cms/concerns/${id}`, { method: 'DELETE' });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Direct Firebase Fallback Store Delete
  try {
    let currentList = await loadFromFirebaseCloud('groupConcerns');
    if (!currentList || !Array.isArray(currentList)) {
      currentList = [...defaultGroupConcerns];
    }
    const updatedList = currentList.filter((c: any) => c.id !== id);

    firebaseSucceeded = await saveToFirebaseCloud('groupConcerns', updatedList);
  } catch (err: any) {
    // Fallback delete notice
  }

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn(`Notice: Group Concern ${id} deleted locally from browser storage.`);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Fetch all Visitor Bookings submitted through the site.
 */
export async function getVisitorBookings(): Promise<VisitBooking[]> {
  const existing = localStorage.getItem('moon_bookings');
  const localList: VisitBooking[] = existing ? JSON.parse(existing) : [];

  try {
    const res = await fetch(`/api/cms/bookings?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const map = new Map<string, VisitBooking>();
        json.data.forEach((b: any) => map.set(b.id, b));
        localList.forEach(b => map.set(b.id, b));
        return Array.from(map.values()).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      }
    }
  } catch (err) {
    console.warn('Server API bookings fetch notice:', err);
  }

  if (isQuotaExceeded()) {
    return localList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }
  try {
    const snap = await withTimeout(getDocs(collection(db, 'bookings')), 3000, true);
    const remoteList = !snap.empty ? snap.docs.map(d => d.data() as VisitBooking) : [];

    const map = new Map<string, VisitBooking>();
    remoteList.forEach(b => map.set(b.id, b));
    localList.forEach(b => map.set(b.id, b));

    const combined = Array.from(map.values());
    return combined.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Could not fetch bookings:', error);
    return localList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }
}

/**
 * Fetch all landowner partnership requests.
 */
export async function getLandownerPartnerships(): Promise<LandownerPartnerSubmission[]> {
  const existing = localStorage.getItem('moon_partnerships');
  const localList: LandownerPartnerSubmission[] = existing ? JSON.parse(existing) : [];

  try {
    const res = await fetch(`/api/cms/partnerships?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const map = new Map<string, LandownerPartnerSubmission>();
        json.data.forEach((p: any) => map.set(p.id, p));
        localList.forEach(p => map.set(p.id, p));
        return Array.from(map.values()).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      }
    }
  } catch (err) {
    console.warn('Server API partnerships fetch notice:', err);
  }

  if (isQuotaExceeded()) {
    return localList;
  }
  try {
    const snap = await withTimeout(getDocs(collection(db, 'partnerships')), 3000, true);
    return snap.docs.map(d => d.data() as LandownerPartnerSubmission).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Could not fetch partnerships:', error);
    return localList;
  }
}

/**
 * Fetch all Testimonials / Reviews for Home Page.
 */
export async function getCMSTestimonials(): Promise<CMSTestimonial[]> {
  const localTestimonials = await getTestimonialsFromLocalStorage();

  try {
    const json = await fetchJsonSafely(`/api/cms/testimonials?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (json.success && Array.isArray(json.data)) {
      const resolvedList = await Promise.all(
        json.data.map((t: any) => processObjectImagesForLoad(t))
      );
      for (const t of resolvedList) {
        await saveTestimonialToLocalStorage(t);
      }
      return resolvedList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    }
  } catch (err) {
    console.warn('Server API testimonials fetch notice, trying Firebase fallback:', err);
  }

  // Try direct Firebase fetch
  try {
    const val = await loadFromFirebaseCloud('testimonials');
    if (val && Array.isArray(val)) {
      const resolvedList = await Promise.all(
        val.map((t: any) => processObjectImagesForLoad(t))
      );
      for (const t of resolvedList) {
        await saveTestimonialToLocalStorage(t);
      }
      return resolvedList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    }
  } catch (err) {
    console.warn('Direct Firebase testimonials load exception:', err);
  }

  if (isQuotaExceeded()) {
    const resolvedLocal = await Promise.all(
      localTestimonials.map(t => processObjectImagesForLoad(t))
    );
    return resolvedLocal;
  }
  try {
    const snap = await withTimeout(getDocs(collection(db, 'testimonials')), 4000, true);
    const remoteList = !snap.empty ? snap.docs.map(d => d.data() as CMSTestimonial) : [];

    const mergedMap = new Map<string, CMSTestimonial>();
    localTestimonials.forEach(t => mergedMap.set(t.id, t));
    remoteList.forEach(t => mergedMap.set(t.id, t));

    const list = Array.from(mergedMap.values());
    const resolvedList = await Promise.all(
      list.map(t => processObjectImagesForLoad(t))
    );

    for (const t of resolvedList) {
      await saveTestimonialToLocalStorage(t);
    }

    return resolvedList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } catch (err: any) {
    const errMsg = String(err?.message || err || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Could not fetch testimonials:', err);
    const resolvedLocal = await Promise.all(
      localTestimonials.map(t => processObjectImagesForLoad(t))
    );
    return resolvedLocal;
  }
}

/**
 * Save/Update Testimonial.
 */
export async function saveCMSTestimonial(testimonial: CMSTestimonial): Promise<void> {
  await saveTestimonialToLocalStorage(testimonial);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK write
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(testimonial, `testimonial_${testimonial.id}`);
      await withTimeout(setDoc(doc(db, 'testimonials', testimonial.id), prepared), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for Testimonial:', err);
    }
  }

  // 2. Express Backend API call (if present)
  try {
    const res = await fetch('/api/cms/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial)
    });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Fallback single-document store write
  try {
    let currentList = await loadFromFirebaseCloud('testimonials');
    if (!currentList || !Array.isArray(currentList)) {
      currentList = [];
    }
    const idx = currentList.findIndex((t: any) => t.id === testimonial.id);
    if (idx >= 0) currentList[idx] = testimonial;
    else currentList.push(testimonial);

    firebaseSucceeded = await saveToFirebaseCloud('testimonials', currentList);
  } catch (err: any) {
    // Fallback store notice
  }

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn(`Notice: Testimonial ${testimonial.id} saved locally in browser storage.`);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Delete Testimonial.
 */
export async function deleteCMSTestimonial(id: string): Promise<void> {
  removeTestimonialFromLocalStorage(id);

  let apiSucceeded = false;
  let firebaseSucceeded = false;
  let directFirestoreSucceeded = false;

  // 1. Direct Firestore SDK Delete
  if (!isQuotaExceeded()) {
    try {
      await withTimeout(deleteDoc(doc(db, 'testimonials', id)), 10000, true);
      directFirestoreSucceeded = true;
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore delete notice for Testimonial:', err);
    }
  }

  // 2. Express Backend API call (if present)
  try {
    const res = await fetch(`/api/cms/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) {
      apiSucceeded = true;
    }
  } catch (err: any) {
    // API not present on static hosting
  }

  // 3. Direct Firebase Fallback Store Delete
  try {
    let currentList = await loadFromFirebaseCloud('testimonials');
    if (!currentList || !Array.isArray(currentList)) {
      currentList = [];
    }
    const updatedList = currentList.filter((t: any) => t.id !== id);

    firebaseSucceeded = await saveToFirebaseCloud('testimonials', updatedList);
  } catch (err: any) {
    // Fallback delete notice
  }

  if (!directFirestoreSucceeded && !apiSucceeded && !firebaseSucceeded) {
    console.warn(`Notice: Testimonial ${id} deleted locally from browser storage.`);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}
