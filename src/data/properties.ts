/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property } from '../types';

export const properties: Property[] = [
  {
    id: 'haven-tower',
    title: 'Haven Tower',
    type: 'residential',
    status: 'ongoing',
    location: 'Gulshan 1, Dhaka',
    area: 'Gulshan 1, Dhaka',
    address: 'House: 15 Heaven Tower, Road: 126/127, Gulshan 1, Dhaka',
    landArea: '28 Katha',
    aptPerFloor: '4 Units / Floor (A, B, C, D)',
    totalUnits: '96 Luxury Units',
    sizeRange: 'A- 4293 Sft | B- 3000 Sft | C- 3000 Sft | D- 3770 Sft',
    priceRange: 'Tk 2.2 - 5.5 Crore',
    beds: 4,
    baths: 4,
    balconies: '3 Balconies (Verandahs)',
    facing: 'South Facing (Open Panoramic View)',
    parking: '1 - 2 Dedicated Basement Car Parking',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579725942955-4d8377f8c66a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1428360905656-e63a3fa0400b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '★ FLAGSHIP ONGOING PROJECT - Heaven Tower stands as Moon Group’s crowning achievement in architectural innovation and luxury urban living. Featuring Zone-4 earthquake resistance, double-height grand atrium lobby, rooftop infinity sky-lounge & pool, intelligent elevators, and smart home automation.',
    features: [
      '🔥 Flagship Ongoing Luxury Tower in Gulshan 1',
      'Grand Double-Height Entrance Atrium Lobby with 24/7 Concierge',
      'Rooftop Infinity Sky Lounge, Swimming Pool & Botanical Terrace',
      'Advanced Earthquake Resistant Structure (Zone 4 Certified)',
      'High-Speed Intelligent Elevators & 100% Generator Power Backup',
      'Smart Home Automation with Biometric Security'
    ],
    amenities: [
      { icon: 'Crown', name: 'Flagship Luxury Tower' },
      { icon: 'Waves', name: 'Rooftop Sky Infinity Pool' },
      { icon: 'Dumbbell', name: 'Ultra-Modern Gym & Spa' },
      { icon: 'Shield', name: 'Biometric Access & 24/7 Security' },
      { icon: 'Zap', name: 'Full Power Backup Generator' },
      { icon: 'Car', name: 'Multi-Level Basement Parking' }
    ],
    floorsCount: 25,
    launchDate: 'July 2026',
    handoverDate: 'December 2028',
    floorLayouts: [
      {
        levelName: 'Heaven Grand Suite - 2,850 Sft',
        sizeSqft: 2850,
        imageUrl: 'https://lh3.googleusercontent.com/d/1MzBr64Y8DJJNG2q_tKa1R-b3ol3rGdgD',
        rooms: [
          { name: 'Panoramic Living Room', x: 5, y: 5, w: 45, h: 45, type: 'living' },
          { name: 'Master Suite & Walk-in Closet', x: 55, y: 5, w: 30, h: 35, type: 'bed' },
          { name: 'Master Luxury Bath', x: 88, y: 5, w: 10, h: 35, type: 'bath' },
          { name: 'Bedroom 2', x: 55, y: 45, w: 20, h: 25, type: 'bed' },
          { name: 'Gourmet Kitchen', x: 5, y: 55, w: 25, h: 35, type: 'kitchen' },
          { name: 'Sky Terrace Balcony', x: 35, y: 55, w: 15, h: 35, type: 'balcony' }
        ]
      },
      {
        levelName: 'Penthouse Executive Suite - 3,600 Sft',
        sizeSqft: 3600,
        imageUrl: 'https://lh3.googleusercontent.com/d/1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6c',
        rooms: [
          { name: 'Royal Grand Salon', x: 5, y: 5, w: 50, h: 45, type: 'living' },
          { name: 'Presidential Bedroom', x: 60, y: 5, w: 35, h: 35, type: 'bed' },
          { name: 'Chef Kitchen', x: 5, y: 55, w: 30, h: 35, type: 'kitchen' },
          { name: 'Panoramic Sky Deck', x: 40, y: 55, w: 55, h: 35, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'mizan-tower-kallyanpur',
    title: 'Mizan Tower (মিজান টাওয়ার)',
    type: 'residential',
    status: 'ongoing',
    location: 'Kallyanpur, Dhaka (কল্যানপুর, ঢাকা)',
    area: 'Kallyanpur, Dhaka',
    sizeRange: '1,650 - 2,800 Sft',
    priceRange: 'Tk 1.2 - 2.8 Crore',
    beds: 3,
    baths: 3,
    floorsCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'মিজান টাওয়ার, কল্যানপুর - ১৪ তলা বিশিষ্ট আধুনিক আভিজাত্যের আবাসিক ও বাণিজ্যিক বহুতল ভবন। উন্নত সিকিউরিটি, প্রাইম লোকেশন ও মনোরম জীবনযাত্রার সব আধুনিক সুযোগ-সুবিধা সম্বলিত প্রজেক্ট।',
    features: [
      '১৪ তলা বিশিষ্ট আধুনিক ও নান্দনিক স্ট্রাকচার',
      'কল্যানপুর বাস স্ট্যান্ড ও মেট্রো স্টেশন সংলগ্ন প্রাইম লোকেশন',
      '২৪/৭ সিসিটিভি ক্যামেরা সিকিউরিটি ও ব্যাকআপ জেনারেটর',
      'উন্নত মানের লিফ্ট ও অগ্নি নির্বাপক ব্যবস্থা'
    ],
    amenities: [
      { icon: 'Shield', name: '24/7 Security' },
      { icon: 'Zap', name: 'Power Backup' },
      { icon: 'Car', name: 'Basement Parking' }
    ],
    floorLayouts: [
      {
        levelName: 'Typical Floor Unit A - 1,850 Sft',
        sizeSqft: 1850,
        imageUrl: 'https://lh3.googleusercontent.com/d/1HfsvkjF_R57oo_rlVDG0lCzB4uSCvJtN',
        rooms: [
          { name: 'Drawing & Dining', x: 5, y: 5, w: 45, h: 40, type: 'living' },
          { name: 'Master Bed', x: 55, y: 5, w: 35, h: 35, type: 'bed' },
          { name: 'Bedroom 2', x: 55, y: 45, w: 35, h: 30, type: 'bed' },
          { name: 'Kitchen', x: 5, y: 50, w: 25, h: 35, type: 'kitchen' },
          { name: 'Front Balcony', x: 32, y: 50, w: 18, h: 35, type: 'balcony' }
        ]
      },
      {
        levelName: 'Executive Suite Unit B - 2,200 Sft',
        sizeSqft: 2200,
        imageUrl: 'https://lh3.googleusercontent.com/d/18WMuVx9H2CWyO2ZlW5N9vbIGt70cG73S',
        rooms: [
          { name: 'Spacious Living Lounge', x: 5, y: 5, w: 50, h: 45, type: 'living' },
          { name: 'Master Suite', x: 60, y: 5, w: 35, h: 35, type: 'bed' },
          { name: 'Modern Kitchen', x: 5, y: 55, w: 30, h: 35, type: 'kitchen' },
          { name: 'Veranda', x: 40, y: 55, w: 20, h: 35, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'sunmoon-star-plaza',
    title: 'Sunmoon Star Plaza (সানমুন স্টার প্লাজা)',
    type: 'commercial',
    status: 'ongoing',
    location: 'Kallyanpur, Dhaka (কল্যানপুর, ঢাকা)',
    area: 'Kallyanpur, Dhaka',
    sizeRange: '2,500 - 8,000 Sft',
    priceRange: 'Price on Request',
    floorsCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'সানমুন স্টার প্লাজা, কল্যানপুর - ২২ তলা বাণিজ্যিক টাওয়ার। কর্পোরেট অফিস, শোরুম ও ব্যাংক হেডকোয়ার্টারের জন্য নির্ধারিত আধুনিক গ্লাস ফেসাড ও আইকনিক আর্কিটেকচার।',
    features: [
      '২২ তলা বিশিষ্ট আইকনিক কমার্শিয়াল আর্কিটেকচার',
      'ক্যাপসুল লিফট, ডাবল হাইট গ্র্যান্ড এন্ট্রি ও আধুনিক সেন্ট্রাল এসি ব্যবস্থা',
      'মাল্টি-লেভেল অটোমেটেড কার পার্কিং'
    ],
    amenities: [
      { icon: 'Award', name: 'Grade-A Business Center' },
      { icon: 'Cpu', name: 'High Speed Elevators' },
      { icon: 'Shield', name: 'Smart Security' }
    ],
    floorLayouts: [
      {
        levelName: 'Commercial Office Floor Plan - 4,500 Sft',
        sizeSqft: 4500,
        imageUrl: 'https://lh3.googleusercontent.com/d/1Hf0dC0-dzgk4r5yLOvfhJc3ZbD3MyXtN',
        rooms: [
          { name: 'Open Office Space', x: 5, y: 5, w: 60, h: 50, type: 'living' },
          { name: 'Executive Cabin', x: 70, y: 5, w: 25, h: 25, type: 'bed' },
          { name: 'Conference Room', x: 70, y: 35, w: 25, h: 30, type: 'corridor' },
          { name: 'Pantry & Washrooms', x: 5, y: 60, w: 30, h: 30, type: 'kitchen' }
        ]
      }
    ]
  },
  {
    id: 'razia-tower-kallyanpur',
    title: 'Razia Tower (রাজিয়া টাওয়ার)',
    type: 'commercial',
    status: 'ongoing',
    location: 'Kallyanpur, Dhaka (কল্যানপুর, ঢাকা)',
    area: 'Kallyanpur, Dhaka',
    sizeRange: '2,000 - 6,500 Sft',
    priceRange: 'Price on Request',
    floorsCount: 20,
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'রাজিয়া টাওয়ার, কল্যানপুর - ২০ তলা বাণিজ্যিক ভবন। ব্যবসায়িক প্রসার ও কর্পোরেট হেডকোয়ার্টারের জন্য প্রস্তুতকৃত আধুনিক বাণিজ্যিক কেন্দ্র।',
    features: [
      '২০ তলা বিশিষ্ট হাই-রাইজ কমার্শিয়াল টাওয়ার',
      'উন্নত সেন্ট্রাল বিল্ডিং ম্যানেজমেন্ট সিস্টেম (BMS)',
      'ডিজিটাল ক্যাফেটেরিয়া ও ফায়ার সেফটি ব্যবস্থা'
    ],
    amenities: [
      { icon: 'Coffee', name: 'Cafeteria & Lounge' },
      { icon: 'Zap', name: '100% Generator Backup' }
    ],
    floorLayouts: [
      {
        levelName: 'Corporate Office Level Plan - 3,800 Sft',
        sizeSqft: 3800,
        imageUrl: 'https://lh3.googleusercontent.com/d/1JLtIalfp49hPq57qAKKE-4Ezraaw7asU',
        rooms: [
          { name: 'Corporate Workstation Zone', x: 5, y: 5, w: 55, h: 55, type: 'living' },
          { name: 'Director Suite', x: 65, y: 5, w: 30, h: 30, type: 'bed' },
          { name: 'Meeting Lounge', x: 65, y: 40, w: 30, h: 25, type: 'corridor' }
        ]
      }
    ]
  },
  {
    id: 'madina-mansion-1',
    title: 'Madina Mansion 1 (মদিনা ম্যানশন ১)',
    type: 'residential',
    status: 'completed',
    location: 'Paikpara, Mirpur, Dhaka (পাইকপাড়া, ঢাকা)',
    area: 'Mirpur, Dhaka',
    sizeRange: '1,400 - 2,200 Sft',
    priceRange: 'Completed Project',
    beds: 3,
    baths: 3,
    floorsCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'মদিনা ম্যানশন (১), ৭ তলা, পাইকপাড়া - শান্ত ও সুন্দর পরিবেশে নিষ্কণ্টক জায়গায় নির্মিত মুন গ্রুপের সফল হ্যান্ডওভারকৃত ৭ তলা আবাসিক অ্যাপার্টমেন্ট।',
    features: [
      '৭ তলা সুপরিকল্পিত আবাসিক ভবন',
      'আলোকোজ্জ্বল ও বায়ু চলাচলের উপযোগী রুম লেআউট',
      'ইন্টারকম ও সিসিটিভি সুবিধা'
    ],
    amenities: [
      { icon: 'Shield', name: '24/7 Security' },
      { icon: 'Smile', name: 'Family Environment' }
    ],
    floorLayouts: [
      {
        levelName: 'Completed Apartment Layout - 1,650 Sft',
        sizeSqft: 1650,
        imageUrl: 'https://lh3.googleusercontent.com/d/1JG0sjCKULHmz4JpmfwfFs6tZc2Wl-Hjt',
        rooms: [
          { name: 'Drawing & Dining Room', x: 5, y: 5, w: 40, h: 40, type: 'living' },
          { name: 'Master Bed', x: 50, y: 5, w: 40, h: 35, type: 'bed' },
          { name: 'Kitchen', x: 5, y: 50, w: 25, h: 35, type: 'kitchen' },
          { name: 'Balcony', x: 35, y: 50, w: 20, h: 35, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'hamida-villa',
    title: 'Hamida Villa (হামিদা ভילה)',
    type: 'residential',
    status: 'completed',
    location: 'Paikpara, Mirpur, Dhaka (পাইকপাড়া, ঢাকা)',
    area: 'Mirpur, Dhaka',
    sizeRange: '1,500 - 2,400 Sft',
    priceRange: 'Completed Project',
    beds: 3,
    baths: 3,
    floorsCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'হামিদা ভילה, ৭ তলা, পাইকপাড়া - পাইকপাড়ার প্রাইম লোকেশনে ৭ তলা বিশিষ্ট আবাসিক ভিলা। সুপরিসর অ্যাপার্টমেন্ট ও আধুনিক ফিটিংসসহ শতভাগ প্রস্তুত।',
    features: [
      '৭ তলা সফলভাবে হস্তান্তরিত অ্যাপার্টমেন্ট',
      'নিজস্ব ডিপ টিউবওয়েল ও ওয়াটার ফিল্ট্রেশন',
      'নিরাপদ পার্কিং ও সুপ্রশস্ত ড্রাইভওয়ে'
    ],
    amenities: [
      { icon: 'Car', name: 'Protected Parking' },
      { icon: 'Zap', name: 'Auto Generator' }
    ],
    floorLayouts: [
      {
        levelName: 'Hamida Villa Floor Plan - 1,800 Sft',
        sizeSqft: 1800,
        imageUrl: 'https://lh3.googleusercontent.com/d/1MzBr64Y8DJJNG2q_tKa1R-b3ol3rGdgD',
        rooms: [
          { name: 'Living Space', x: 5, y: 5, w: 45, h: 40, type: 'living' },
          { name: 'Master Bedroom', x: 55, y: 5, w: 35, h: 35, type: 'bed' },
          { name: 'Kitchen & Pantry', x: 5, y: 50, w: 30, h: 35, type: 'kitchen' }
        ]
      }
    ]
  },
  {
    id: 'mizan-tower-2',
    title: 'Mizan Tower 2 (মিজান টাওয়ার ২)',
    type: 'residential',
    status: 'ongoing',
    location: 'Amin Bazar, Dhaka (আমিন বাজার, ঢাকা)',
    area: 'Amin Bazar, Dhaka',
    sizeRange: '1,250 - 2,100 Sft',
    priceRange: 'Tk 45 - 85 Lakh',
    beds: 3,
    baths: 3,
    floorsCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'মিজান টাওয়ার (২), ৭ তলা, আমিন বাজার - গাবতলী ও আমিন বাজার ব্রিজের অদূরে ৭ তলা বিশিষ্ট আধুনিক নির্মাণাধীন আবাসিক প্রজেক্ট।',
    features: [
      '৭ তলা ভূমিকম্প প্রতিরোধী স্ট্রাকচার',
      'সহজ কিস্তিতে ক্রয়ের আকর্ষণীয় সুযোগ',
      'খোলামেলা মনোরম পরিবেশ'
    ],
    amenities: [
      { icon: 'Shield', name: 'Gated Security' },
      { icon: 'Zap', name: 'Standby Generator' }
    ],
    floorLayouts: [
      {
        levelName: 'Mizan Tower 2 Floor Plan - 1,550 Sft',
        sizeSqft: 1550,
        imageUrl: 'https://lh3.googleusercontent.com/d/1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6c',
        rooms: [
          { name: 'Drawing & Dining', x: 5, y: 5, w: 40, h: 40, type: 'living' },
          { name: 'Master Bed', x: 50, y: 5, w: 40, h: 35, type: 'bed' },
          { name: 'Kitchen', x: 5, y: 50, w: 25, h: 35, type: 'kitchen' }
        ]
      }
    ]
  },
  {
    id: 'al-mizan-city',
    title: 'Al Mizan City (আল মিজান সিটি - প্রস্তাবিত ১০ বিঘা প্রজেক্ট)',
    type: 'residential',
    status: 'upcoming',
    location: 'Amin Bazar, Dhaka (আমিন বাজার, ঢাকা)',
    area: 'Amin Bazar, Dhaka',
    sizeRange: 'Proposed 10 Bigha Township',
    priceRange: 'Price on Request',
    landArea: '10 Bigha (৩.৩ একর)',
    floorsCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'আল মিজান সিটি প্রস্তাবিত ১০ বিঘা প্রজেক্ট, আমিন বাজার - ঢাকার প্রবেশদ্বারে ১০ বিঘা জমির উপর প্রস্তাবিত মেগা মডেল টাউন ও গ্রীন টাউনশিপ প্রজেক্ট।',
    features: [
      '১০ বিঘা বিশাল ভূমির উপর পরিকল্পিত স্যাটেলাইট সিটি',
      'নিজস্ব স্কুল, মসজিদ, পার্ক, প্লেগ্রাউন্ড ও শপিং সেন্টার',
      'প্রশস্ত মেম্বেন রোড ও পরিবেশবান্ধব লেকসাইড ভিউ'
    ],
    amenities: [
      { icon: 'Compass', name: '10 Bigha Mega Project' },
      { icon: 'Leaf', name: 'Green Park & Lake' },
      { icon: 'Smile', name: 'Playground & School' }
    ],
    floorLayouts: [
      {
        levelName: 'Master Masterplan Layout - 10 Bigha Township',
        sizeSqft: 12000,
        imageUrl: 'https://lh3.googleusercontent.com/d/1HfsvkjF_R57oo_rlVDG0lCzB4uSCvJtN',
        rooms: [
          { name: 'Residential Zone', x: 5, y: 5, w: 50, h: 50, type: 'living' },
          { name: 'Commercial Hub', x: 60, y: 5, w: 35, h: 35, type: 'corridor' },
          { name: 'Central Lake & Park', x: 5, y: 60, w: 90, h: 30, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'madina-mansion-2',
    title: 'Madina Mansion 2 (মদিনা ম্যানশন ২)',
    type: 'residential',
    status: 'completed',
    location: 'Gulshan 2, Dhaka (গুলশান ২, ঢাকা)',
    area: 'Gulshan 2, Dhaka',
    sizeRange: '2,800 - 3,500 Sft',
    priceRange: 'Completed Luxury Residence',
    beds: 4,
    baths: 4,
    floorsCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'মদিনা ম্যানশন ২, ৭ তলা, গুলশান ২ - গুলশান ২ এর সর্বোচ্চ নিরাপত্তা বেষ্টিত ডিপ্লোম্যাটিক জোনের কাছে ৭ তলা লাক্সারি রেসিডেন্স।',
    features: [
      '৭ তলা অভিজাত আল্ট্রা লাক্সারি রেসিডেন্সিয়াল ভবন',
      'ইতালিয়ান মার্বেল ফ্লোরিং ও সেন্ট্রাল এসি ডাক্টিং',
      'ব্যক্তিগত কীকার্ড লিফট সার্ভিস'
    ],
    amenities: [
      { icon: 'Crown', name: 'Gulshan 2 Prime Location' },
      { icon: 'Shield', name: 'Biometric Access Control' }
    ],
    floorLayouts: [
      {
        levelName: 'Gulshan 2 Ultra-Luxury Floor Plan - 3,200 Sft',
        sizeSqft: 3200,
        imageUrl: 'https://lh3.googleusercontent.com/d/18WMuVx9H2CWyO2ZlW5N9vbIGt70cG73S',
        rooms: [
          { name: 'Grand Living Hall', x: 5, y: 5, w: 50, h: 45, type: 'living' },
          { name: 'Master Suite', x: 60, y: 5, w: 35, h: 35, type: 'bed' },
          { name: 'Kitchen & Island', x: 5, y: 55, w: 30, h: 35, type: 'kitchen' },
          { name: 'Veranda', x: 40, y: 55, w: 20, h: 35, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'al-mizan-shopping-complex',
    title: 'Al Mizan Shopping Complex (আল মিজান শপিং কমপ্লেক্স)',
    type: 'commercial',
    status: 'completed',
    location: 'Barguna (বরগুনা)',
    area: 'Barguna',
    sizeRange: '10-Story Commercial Plaza',
    priceRange: 'Completed Commercial Landmark',
    floorsCount: 10,
    imageUrl: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'আল মিজান শপিং কমপ্লেক্স ১০ তলা, বরগুনা - বরগুনা শহরের কেন্দ্রস্থলে অবস্থিত ১০ তলা বাণিজ্যিক কেনাকাটার কেন্দ্র ও কর্পোরেট প্লাজা।',
    features: [
      '১০ তলা আধুনিক বরগুনা সেন্ট্রাল শপিং কমপ্লেক্স',
      'ব্র্যান্ড শোরুম, ব্যাংক, এস্কেলেটর ও সেন্ট্রাল এসি সুবিধা',
      'বিশাল শপিং এরিয়া ও ফুডকোর্ট'
    ],
    amenities: [
      { icon: 'Award', name: '10-Story Shopping Mall' },
      { icon: 'Car', name: 'Spacious Mall Parking' }
    ],
    floorLayouts: [
      {
        levelName: 'Shopping Mall Floor Layout - Level 1 to 5',
        sizeSqft: 6000,
        imageUrl: 'https://lh3.googleusercontent.com/d/1Hf0dC0-dzgk4r5yLOvfhJc3ZbD3MyXtN',
        rooms: [
          { name: 'Central Atrium & Outlets', x: 5, y: 5, w: 60, h: 60, type: 'living' },
          { name: 'Escalator & Elevator Bank', x: 70, y: 5, w: 25, h: 25, type: 'corridor' }
        ]
      }
    ]
  },
  {
    id: 'kuakata-resort',
    title: 'Kuakata Resort Project (৩০ বিঘা কুয়াকাটা রিসোর্ট প্রকল্প)',
    type: 'commercial',
    status: 'upcoming',
    location: 'Kuakata Beach, Patuakhali (কুয়াকাটা, পটুয়াখালী)',
    area: 'Kuakata, Patuakhali',
    sizeRange: '30 Bigha Beachfront Eco Resort',
    priceRange: 'Upcoming Hospitality Venture',
    landArea: '30 Bigha',
    floorsCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    ],
    description: '৩০ বিঘা কুয়াকাটা রিসোর্ট প্রকল্প - সাগরকন্যা কুয়াকাটা সমুদ্র সৈকত সংলগ্ন ৩০ বিঘা আয়তনের ৫-স্টার ক্যাটাগরির আন্তর্জাতিক মানের ওয়াটার রিসোর্ট।',
    features: [
      '৩০ বিঘা জুড়ে বিস্তৃত বিশ্বমানের সমুদ্র সৈকত রিসোর্ট',
      'প্রাইভেট বিচ এক্সেস, ওয়াটার স্পোর্টস ও প্রিমিয়াম ভিলা',
      'ইনফিনিটি পুল, স্পা ও আন্তর্জাতিক কনভেনশন হল'
    ],
    amenities: [
      { icon: 'Waves', name: 'Beachfront Infinity Pool' },
      { icon: 'Compass', name: '30 Bigha Ocean Resort' }
    ],
    floorLayouts: [
      {
        levelName: 'Resort Beachfront Master Layout - 30 Bigha',
        sizeSqft: 15000,
        imageUrl: 'https://lh3.googleusercontent.com/d/1JLtIalfp49hPq57qAKKE-4Ezraaw7asU',
        rooms: [
          { name: 'Luxury Villas Zone', x: 5, y: 5, w: 45, h: 45, type: 'living' },
          { name: 'Infinity Pool & Spa', x: 55, y: 5, w: 40, h: 40, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'coxs-bazar-resort',
    title: 'Cox\'s Bazar Resort Project (২০ বিঘা কক্সবাজার রিসোর্ট প্রকল্প)',
    type: 'commercial',
    status: 'upcoming',
    location: 'Marine Drive, Cox\'s Bazar (কক্সবাজার)',
    area: 'Cox\'s Bazar',
    sizeRange: '20 Bigha Oceanfront Luxury Resort',
    priceRange: 'Upcoming Five-Star Destination',
    landArea: '20 Bigha',
    floorsCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'কক্সবাজার ২০ বিঘা রিসোর্ট প্রকল্প - মেরিন ড্রাইভ রোড সংলগ্ন ২০ বিঘা জমির ওপর নির্মিতব্য ফাইভ স্টার রিসোর্ট ও লাক্সারি কটেজ প্রজেক্ট।',
    features: [
      'মেরিন ড্রাইভ রোডে ২০ বিঘা প্রাইম ওশান ফ্রন্ট প্রপার্টি',
      'হেলিপ্যাড, প্রাইভেট সি-ভিউ ব্যালকনি ও আন্তর্জাতিক শেফ রেস্টুরেন্ট',
      'ব্যাংকুয়েট হল, সুইমিং পুল ও স্পা সেন্ট্রাল'
    ],
    amenities: [
      { icon: 'Waves', name: 'Oceanfront Luxury Resort' },
      { icon: 'Crown', name: '5-Star Hospitality' }
    ],
    floorLayouts: [
      {
        levelName: 'Marine Drive Resort Masterplan - 20 Bigha',
        sizeSqft: 12500,
        imageUrl: 'https://lh3.googleusercontent.com/d/1JG0sjCKULHmz4JpmfwfFs6tZc2Wl-Hjt',
        rooms: [
          { name: 'Ocean View Suites', x: 5, y: 5, w: 50, h: 45, type: 'living' },
          { name: 'Beachfront Boardwalk', x: 5, y: 55, w: 90, h: 35, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'sunmoon-star-tower',
    title: 'Sunmoon Star Tower (সানমুন স্টার টাওয়ার, ৩৭ দিলকুশা)',
    type: 'commercial',
    status: 'ongoing',
    location: '37 Dilkusha, Motijheel, Dhaka (৩৭ দিলকুশা, মতিঝিল)',
    area: 'Motijheel C/A, Dhaka',
    sizeRange: '3,500 - 12,000 Sft',
    priceRange: 'Price on Request',
    floorsCount: 24,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'সানমুন স্টার টাওয়ার, ৩৭ দিলকুশা, মতিঝিল ২৪ তলা - মতিঝিল বাণিজ্যিক এলাকার প্রানকেন্দ্রে ৩৭ দিলকুশায় ২৪ তলা আইকনিক কর্পোরেট টাওয়ার।',
    features: [
      '২৪ তলা বিশিষ্ট রাজকীয় মতিঝিল দিলকুশা কমার্শিয়াল টাওয়ার',
      'হাই-স্পিড প্যাসেঞ্জার ও কার্গো ক্যাপসুল লিফট',
      'মাল্টি-লেভেল বেসমেন্ট পার্কিং ও সর্বোচ্চ সিকিউরিটি'
    ],
    amenities: [
      { icon: 'Award', name: '24-Story Commercial Tower' },
      { icon: 'Cpu', name: 'Smart Building Automation' },
      { icon: 'Zap', name: 'Full Redundant Power' }
    ],
    floorLayouts: [
      {
        levelName: '37 Dilkusha Corporate Floor Plan - 6,500 Sft',
        sizeSqft: 6500,
        imageUrl: 'https://lh3.googleusercontent.com/d/1MzBr64Y8DJJNG2q_tKa1R-b3ol3rGdgD',
        rooms: [
          { name: 'Executive Suite & Trading Floor', x: 5, y: 5, w: 60, h: 50, type: 'living' },
          { name: 'Boardroom', x: 70, y: 5, w: 25, h: 30, type: 'corridor' }
        ]
      }
    ]
  }
];
