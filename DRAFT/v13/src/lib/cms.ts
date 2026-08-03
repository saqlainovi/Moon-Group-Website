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
  status: 'ongoing' | 'upcoming' | 'completed';
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
}

// Default values for seeding
const defaultSiteSettings: CMSSiteSettings = {
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
  telephoneNumbers: '0241002945, 0241002946, 0241002947, 0241002948, 0241002949, 0241002951, 0241000182',
  copyrightText: '© 2026 Moon Builders — Moon Group of Industries. All rights reserved.',
  showVirtualConfigurator: true,
  showHavenTowerBanner: true,
  havenTowerBannerImage: '/haven_tower/img_4.jpg',
  havenTowerTitle: 'HEAVEN TOWER by Moon Group',
  havenTowerDescription: '📢 হেভেন টাওয়ার (HEAVEN TOWER) এর উদ্বোধন সম্পন্ন হয়েছে - বর্তমানে বুকিং এবং সেল চলছে! আকর্ষণীয় আর্কিটেকচার, ডাবল-হাইট এট্রিয়াম লবি, রুফটপ ইনফিনিটি পুল এবং Zone-4 ভূমিকম্প প্রতিরোধী স্ট্রাকচার বিশিষ্ট মুন গ্রুপের ফ্ল্যাগশিপ প্রজেক্ট।'
};

// Default values for seeding
const defaultAboutUs: CMSAboutUs = {
  id: 'main',
  tagline: 'A Legacy Since 1989',
  title: 'FOUR DECADES OF\nBUILDING TRUST.',
  paragraph1: 'Moon Builders is the construction and real estate arm of Moon Group of Industries, founded in 1989 under the visionary leadership of Al-haj Mizanur Rahman. What began with a single housing venture has grown into a conglomerate spanning real estate, housing, construction, textiles, hospitality, and agriculture — with the exact same site discipline applied on every project, big or small.',
  paragraph2: 'We handle the full span of delivery: land assessment, structural engineering, on-site raw material quality control, and timely handover. Our promise is simple: what is drafted on paper is precisely what stands on the ground.',
  imageUrl: 'https://images.unsplash.com/photo-1609867271967-a82f85c48531?fm=jpg&q=70&w=1400&auto=format&fit=crop',
  yearFounded: 1989,
  sisterConcernsCount: 19,
  sectorsActiveCount: 11,
};

const defaultHeroSlides: CMSHeroSlide[] = [
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
  }
];

/**
 * Seed database with default content if collections are completely empty.
 */
export async function seedCMSDatabaseIfNeeded() {
  if (isQuotaExceeded()) {
    return;
  }
  try {
    // 1. Seed Properties
    const propertiesSnap = await withTimeout(getDocs(collection(db, 'properties')), 4000, true);
    if (propertiesSnap.empty) {
      console.log('Seeding Properties...');
      for (const p of defaultProperties) {
        await setDoc(doc(db, 'properties', p.id), p);
      }
    }

    // 2. Seed About Us
    const aboutUsSnap = await withTimeout(getDoc(doc(db, 'about_us', 'main')), 4000, true);
    if (!aboutUsSnap.exists()) {
      console.log('Seeding About Us...');
      await setDoc(doc(db, 'about_us', 'main'), defaultAboutUs);
    }

    // 3. Seed Hero Slides
    const slidesSnap = await withTimeout(getDocs(collection(db, 'hero_slides')), 4000, true);
    if (slidesSnap.empty) {
      console.log('Seeding Hero Slides...');
      for (const s of defaultHeroSlides) {
        await setDoc(doc(db, 'hero_slides', s.id), s);
      }
    }

    // 4. Seed Group Concerns
    const concernsSnap = await withTimeout(getDocs(collection(db, 'group_concerns')), 4000, true);
    if (concernsSnap.empty) {
      console.log('Seeding Group Concerns...');
      for (const c of defaultGroupConcerns) {
        await setDoc(doc(db, 'group_concerns', c.id), c);
      }
    }

    // 5. Seed sample bookings if empty to ensure the collection exists in the Console
    const bookingsSnap = await withTimeout(getDocs(collection(db, 'bookings')), 4000, true);
    if (bookingsSnap.empty) {
      console.log('Seeding Sample Booking...');
      const sampleBooking = {
        id: 'BKG-SAMPLE',
        name: 'Sample Visitor',
        email: 'visitor@example.com',
        phone: '+8801712345678',
        propertyId: 'slide-2',
        propertyName: 'Moon Imperial Residence',
        date: '2026-07-20',
        timeSlot: '11:00 AM - 12:00 PM',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'bookings', sampleBooking.id), sampleBooking);
    }

    // 6. Seed sample partnerships if empty
    const partnershipsSnap = await withTimeout(getDocs(collection(db, 'partnerships')), 4000, true);
    if (partnershipsSnap.empty) {
      console.log('Seeding Sample Partnership...');
      const samplePartnership = {
        id: 'PRT-SAMPLE',
        name: 'Al-Haj Karim Chowdhury',
        phone: '+8801812345678',
        email: 'karim@example.com',
        location: 'Gulshan-2, Dhaka',
        sizeKatha: 12,
        roadWidthFt: 40,
        frontageFt: 60,
        facing: 'north',
        additionalDetails: 'Prime corner plot. Looking for a modern joint venture residential development.',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'partnerships', samplePartnership.id), samplePartnership);
    }

    // 7. Seed sample contact inquiries if empty
    const contactSnap = await withTimeout(getDocs(collection(db, 'contact_inquiries')), 4000, true);
    if (contactSnap.empty) {
      console.log('Seeding Sample Contact Inquiry...');
      const sampleInquiry = {
        id: 'CON-SAMPLE',
        name: 'Tariq Anam',
        phone: '+8801912345678',
        email: 'tariq@example.com',
        subject: 'Interested in Skyline Horizon',
        message: 'Hello, please send me the price brochure and apartment floor layout designs.',
        createdAt: new Date().toLocaleDateString()
      };
      await setDoc(doc(db, 'contact_inquiries', sampleInquiry.id), sampleInquiry);
    }

    // 8. Seed sample NRB inquiries if empty
    const nrbSnap = await withTimeout(getDocs(collection(db, 'nrb_inquiries')), 4000, true);
    if (nrbSnap.empty) {
      console.log('Seeding Sample NRB Inquiry...');
      const sampleNrb = {
        id: 'NRB-SAMPLE',
        name: 'Zafar Iqbal',
        phone: '+1 718-555-0199',
        countryOfResidence: 'United States',
        additionalDetails: 'Interested in purchasing a penthouse in Baridhara.',
        createdAt: new Date().toLocaleDateString(),
        status: 'new'
      };
      await setDoc(doc(db, 'nrb_inquiries', sampleNrb.id), sampleNrb);
    }

    // 9. Seed sample referrals if empty
    const referralSnap = await withTimeout(getDocs(collection(db, 'referrals')), 4000, true);
    if (referralSnap.empty) {
      console.log('Seeding Sample Referral...');
      const sampleReferral = {
        id: 'REF-SAMPLE',
        referrerName: 'Farid Ahmed',
        referrerPhone: '+8801512345678',
        friendName: 'Dr. Shahana Rahman',
        friendPhone: '+8801612345678',
        interestedProject: 'Moon Skyline Horizon',
        createdAt: new Date().toLocaleDateString(),
        status: 'pending'
      };
      await setDoc(doc(db, 'referrals', sampleReferral.id), sampleReferral);
    }

    // 10. Seed site settings if empty
    const settingsSnap = await withTimeout(getDoc(doc(db, 'site_settings', 'main')), 4000, true);
    if (!settingsSnap.exists()) {
      console.log('Seeding Site Settings...');
      await setDoc(doc(db, 'site_settings', 'main'), defaultSiteSettings);
    }
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('CMS Database offline or seed limit notice.', error);
  }
}

/**
 * Fetch Site Settings dynamic configuration.
 */
export async function getCMSSiteSettings(): Promise<CMSSiteSettings> {
  const localSettings = await getSiteSettingsFromLocalStorage();
  try {
    const res = await fetch('/api/cms/site-settings');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const merged = { ...defaultSiteSettings, ...json.data };
        await saveSiteSettingsToLocalStorage(merged);
        return await processObjectImagesForLoad(merged);
      }
    }
  } catch (err) {
    console.warn('Server API site settings fetch notice, trying local/firestore fallback', err);
  }

  if (isQuotaExceeded()) {
    const merged = { ...defaultSiteSettings, ...(localSettings || {}) };
    return await processObjectImagesForLoad(merged);
  }
  try {
    const snap = await withTimeout(getDoc(doc(db, 'site_settings', 'main')), 4000, true);
    if (snap.exists()) {
      const remoteData = snap.data() as CMSSiteSettings;
      const merged = { ...defaultSiteSettings, ...(localSettings || {}), ...remoteData };
      await saveSiteSettingsToLocalStorage(merged);
      return await processObjectImagesForLoad(merged);
    }
    const merged = { ...defaultSiteSettings, ...(localSettings || {}) };
    return await processObjectImagesForLoad(merged);
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Failed to fetch Site Settings from Firebase. Using local fallback.', error);
    const merged = { ...defaultSiteSettings, ...(localSettings || {}) };
    return await processObjectImagesForLoad(merged);
  }
}

/**
 * Save Site Settings data.
 */
export async function saveCMSSiteSettings(data: CMSSiteSettings): Promise<void> {
  // 1. Save locally in browser
  await saveSiteSettingsToLocalStorage(data);

  // 2. Save directly to Express Backend Server
  try {
    await fetch('/api/cms/site-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.warn('Server API site settings save notice:', err);
  }

  // 3. Mirror to Firebase in background if quota not exceeded
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(data, 'site_settings_main');
      await withTimeout(setDoc(doc(db, 'site_settings', 'main'), prepared), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for Site Settings (saved on server & locally):', err);
    }
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
    const res = await fetch('/api/cms/properties');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const resolvedDocs = await Promise.all(
          json.data.map((doc: any) => processObjectImagesForLoad(doc))
        );
        for (const p of resolvedDocs) {
          await savePropertyToLocalStorage(p);
        }
        return resolvedDocs.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
      }
    }
  } catch (err) {
    console.warn('Server API properties fetch notice, trying fallbacks', err);
  }

  if (isQuotaExceeded()) {
    const propertyMap = new Map<string, Property>();
    defaultProperties.forEach(p => propertyMap.set(p.id, p));
    localProps.forEach(p => propertyMap.set(p.id, p));
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

    const propertyMap = new Map<string, Property>();
    localProps.forEach(p => propertyMap.set(p.id, p));
    resolvedDocs.forEach(p => propertyMap.set(p.id, p));

    const merged = Array.from(propertyMap.values());
    for (const p of merged) {
      await savePropertyToLocalStorage(p);
    }

    return merged.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Failed to fetch properties from Firebase. Using local fallbacks.', error);
    const propertyMap = new Map<string, Property>();
    defaultProperties.forEach(p => propertyMap.set(p.id, p));
    localProps.forEach(p => propertyMap.set(p.id, p));
    const merged = Array.from(propertyMap.values());
    return merged.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
  }
}

/**
 * Save/Update property in Server, LocalStorage and Firebase safely.
 */
export async function saveCMSProperty(property: Property): Promise<void> {
  await savePropertyToLocalStorage(property);

  try {
    await fetch('/api/cms/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property)
    });
  } catch (err) {
    console.warn('Server API property save notice:', err);
  }

  if (!isQuotaExceeded()) {
    try {
      const preparedProperty = await processObjectImagesForSave(property, `prop_${property.id}`);
      await withTimeout(setDoc(doc(db, 'properties', property.id), preparedProperty), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore property write notice:', err);
    }
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

  try {
    await fetch(`/api/cms/properties/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Server API property delete notice:', err);
  }
  
  if (!isQuotaExceeded()) {
    try {
      await withTimeout(deleteDoc(doc(db, 'properties', id)), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore delete notice:', err);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}

/**
 * Fetch About Us dynamic configuration.
 */
export async function getCMSAboutUs(): Promise<CMSAboutUs> {
  const local = await getAboutUsFromLocalStorage();

  try {
    const res = await fetch('/api/cms/about');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const loaded = await processObjectImagesForLoad(json.data);
        const merged = { ...defaultAboutUs, ...loaded };
        await saveAboutUsToLocalStorage(merged);
        return merged;
      }
    }
  } catch (err) {
    console.warn('Server API about us fetch notice:', err);
  }

  if (isQuotaExceeded()) {
    return local || defaultAboutUs;
  }
  try {
    const snap = await withTimeout(getDoc(doc(db, 'about_us', 'main')), 4000, true);
    if (snap.exists()) {
      const data = snap.data() as CMSAboutUs;
      const loaded = await processObjectImagesForLoad(data);
      const merged = { ...defaultAboutUs, ...(local || {}), ...loaded };
      await saveAboutUsToLocalStorage(merged);
      return merged;
    }
    return local || defaultAboutUs;
  } catch (error: any) {
    const errMsg = String(error?.message || error || '').toLowerCase();
    if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
      markQuotaExceeded();
    }
    console.warn('Failed to fetch About Us from Firebase. Using local fallback.', error);
    return local || defaultAboutUs;
  }
}

/**
 * Save About Us data.
 */
export async function saveCMSAboutUs(data: CMSAboutUs): Promise<void> {
  await saveAboutUsToLocalStorage(data);

  try {
    await fetch('/api/cms/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.warn('Server API about us save notice:', err);
  }

  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(data, 'about_us');
      await withTimeout(setDoc(doc(db, 'about_us', 'main'), prepared), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for About Us:', err);
    }
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
    const res = await fetch('/api/cms/slides');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const filtered = json.data.filter((s: any) => !deletedIds.includes(s.id));
        const resolvedSlides = await Promise.all(
          filtered.map((slide: any) => processObjectImagesForLoad(slide))
        );
        for (const s of resolvedSlides) {
          await saveSlideToLocalStorage(s);
        }
        return resolvedSlides.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
      }
    }
  } catch (err) {
    console.warn('Server API hero slides fetch notice:', err);
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
  localSlides.forEach(s => mergedMap.set(s.id, s));
  baseSlides.forEach(s => mergedMap.set(s.id, s));

  const slides = Array.from(mergedMap.values());
  const resolvedSlides = await Promise.all(
    slides.map(slide => processObjectImagesForLoad(slide))
  );

  for (const s of resolvedSlides) {
    await saveSlideToLocalStorage(s);
  }

  return resolvedSlides.sort((a, b) => (a.id === 'haven-tower' ? -1 : b.id === 'haven-tower' ? 1 : 0));
}

/**
 * Save/Update Hero Slide.
 */
export async function saveCMSHeroSlide(slide: CMSHeroSlide): Promise<void> {
  await saveSlideToLocalStorage(slide);

  try {
    await fetch('/api/cms/slides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slide)
    });
  } catch (err) {
    console.warn('Server API hero slide save notice:', err);
  }
  
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(slide, `slide_${slide.id}`);
      await withTimeout(setDoc(doc(db, 'hero_slides', slide.id), prepared), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for Hero Slide:', err);
    }
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

  try {
    await fetch(`/api/cms/slides/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Server API hero slide delete notice:', err);
  }
  
  if (!isQuotaExceeded()) {
    try {
      await withTimeout(deleteDoc(doc(db, 'hero_slides', id)), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore delete notice for Hero Slide:', err);
    }
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
    const res = await fetch('/api/cms/concerns');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const resolvedList = await Promise.all(
          json.data.map((c: any) => processObjectImagesForLoad(c))
        );
        for (const c of resolvedList) {
          await saveGroupConcernToLocalStorage(c);
        }
        return resolvedList.sort((a, b) => a.num.localeCompare(b.num));
      }
    }
  } catch (err) {
    console.warn('Server API group concerns fetch notice:', err);
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

  try {
    await fetch('/api/cms/concerns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(concern)
    });
  } catch (err) {
    console.warn('Server API group concern save notice:', err);
  }
  
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(concern, `concern_${concern.id}`);
      await withTimeout(setDoc(doc(db, 'group_concerns', concern.id), prepared), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for Group Concern:', err);
    }
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

  try {
    await fetch(`/api/cms/concerns/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Server API group concern delete notice:', err);
  }
  
  if (!isQuotaExceeded()) {
    try {
      await withTimeout(deleteDoc(doc(db, 'group_concerns', id)), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore delete notice for Group Concern:', err);
    }
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
    const res = await fetch('/api/cms/bookings');
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
    const res = await fetch('/api/cms/partnerships');
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
    const res = await fetch('/api/cms/testimonials');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const resolvedList = await Promise.all(
          json.data.map((t: any) => processObjectImagesForLoad(t))
        );
        for (const t of resolvedList) {
          await saveTestimonialToLocalStorage(t);
        }
        return resolvedList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      }
    }
  } catch (err) {
    console.warn('Server API testimonials fetch notice:', err);
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

  try {
    await fetch('/api/cms/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial)
    });
  } catch (err) {
    console.warn('Server API testimonial save notice:', err);
  }
  
  if (!isQuotaExceeded()) {
    try {
      const prepared = await processObjectImagesForSave(testimonial, `testimonial_${testimonial.id}`);
      await withTimeout(setDoc(doc(db, 'testimonials', testimonial.id), prepared), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore write notice for Testimonial:', err);
    }
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

  try {
    await fetch(`/api/cms/testimonials/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Server API testimonial delete notice:', err);
  }
  
  if (!isQuotaExceeded()) {
    try {
      await withTimeout(deleteDoc(doc(db, 'testimonials', id)), 10000, true);
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('quota') || errMsg.includes('resource-exhausted')) {
        markQuotaExceeded();
      }
      console.warn('Firestore delete notice for Testimonial:', err);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cms_updated'));
  }
}
