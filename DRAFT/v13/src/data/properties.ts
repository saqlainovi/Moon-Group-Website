/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property } from '../types';

export const properties: Property[] = [
  {
    id: 'haven-tower',
    title: 'Heaven Tower',
    type: 'residential',
    status: 'ongoing',
    location: 'Plot 01, Section 12, Mirpur / Prime Location, Dhaka',
    area: 'Mirpur, Dhaka',
    sizeRange: '1,850 - 3,600 Sft',
    priceRange: 'Tk 2.2 - 5.5 Crore (Inauguration Offer)',
    beds: 4,
    baths: 4,
    imageUrl: '/haven_tower/img_4.jpg',
    gallery: [
      '/haven_tower/img_4.jpg',
      '/haven_tower/img_1.jpg',
      '/haven_tower/img_6.jpg',
      '/haven_tower/img_2.jpg',
      '/haven_tower/img_7.jpg',
      '/haven_tower/img_3.jpg',
      '/haven_tower/img_8.jpg',
      '/haven_tower/img_5.jpg',
      '/haven_tower/img_9.jpg',
      '/haven_tower/img_10.jpg',
      '/haven_tower/img_11.jpg'
    ],
    description: '★ MAIN ATTRACTION & FLAGSHIP PROJECT - HEAVEN TOWER IS NOW OFFICIALLY INAUGURATED! Heaven Tower stands as Moon Group’s crowning achievement in architectural innovation and luxury urban living. Featuring Zone-4 earthquake resistance, double-height grand atrium lobby, rooftop infinity sky-lounge & pool, intelligent elevators, and smart home automation. Booking and sales are currently open with exclusive launch privileges.',
    features: [
      '🔥 Newly Inaugurated - Booking & Sales Currently Open!',
      'Grand Double-Height Entrance Atrium Lobby with 24/7 Security & Concierge',
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
        levelName: 'Heaven Executive Royal Duplex - 3,600 Sft',
        sizeSqft: 3600,
        rooms: [
          { name: 'Grand Double-Height Living Salon', x: 5, y: 5, w: 50, h: 50, type: 'living' },
          { name: 'Primary Royal Suite', x: 60, y: 5, w: 35, h: 40, type: 'bed' },
          { name: 'Ensuite Luxury Bath', x: 60, y: 48, w: 20, h: 22, type: 'bath' },
          { name: 'Secondary Suite', x: 5, y: 60, w: 25, h: 35, type: 'bed' },
          { name: 'State-of-Art Kitchen', x: 32, y: 60, w: 23, h: 35, type: 'kitchen' },
          { name: 'Panoramic Sky Deck', x: 82, y: 48, w: 13, h: 47, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'moon-skyline-horizon',
    title: 'Sun Moon Star',
    type: 'residential',
    status: 'ongoing',
    location: 'Road 54, Gulshan 2, Dhaka',
    area: 'Gulshan, Dhaka',
    sizeRange: '3,250 - 4,800 Sft',
    priceRange: 'Tk 6.5 - 9.8 Crore',
    beds: 4,
    baths: 5,
    imageUrl: 'https://lh3.googleusercontent.com/d/1ipWRwMZ9rmEX0zlwXwZKj-AsRRipCuim',
    gallery: [
      'https://lh3.googleusercontent.com/d/1ipWRwMZ9rmEX0zlwXwZKj-AsRRipCuim',
      'https://lh3.googleusercontent.com/d/1z0rDLW4oNG-6S1PgrPxw0sIJXjUy22il',
      'https://lh3.googleusercontent.com/d/1XwSyxMxjuTIj8IDAoAjfwv1o_pbAVvMV',
      'https://lh3.googleusercontent.com/d/1xZ7UnlKaachkZH2D6LWhAm_fNZrfKTYx'
    ],
    description: 'An architectural masterwork soaring into the Dhaka skyline. Moon Skyline Horizon redefines urban luxury with towering architectural grandeur, cantilevered garden terraces, and majestic 270-degree views of Gulshan Lake.',
    features: [
      'Lakeview Infinity Pool & Sky Lounge',
      'Advanced Earthquake Resistant Structure (Zone 3 certified)',
      'Smart Home Automation with voice & mobile app controls',
      'Leed Gold Certified energy-efficient design',
      '24/7 Multi-tier Security & IP Surveillance'
    ],
    amenities: [
      { icon: 'Dumbbell', name: 'State-of-the-Art Gym' },
      { icon: 'Waves', name: 'Rooftop Infinity Pool' },
      { icon: 'Shield', name: 'Biometric Access Control' },
      { icon: 'Leaf', name: 'Eco-Friendly Landscaping' },
      { icon: 'Zap', name: '100% Full Power Backup' },
      { icon: 'Car', name: 'Triple Basements Parking' }
    ],
    floorsCount: 22,
    launchDate: 'October 2025',
    handoverDate: 'December 2028',
    floorLayouts: [
      {
        levelName: 'Type A - 3,250 Sft (Standard Luxury)',
        sizeSqft: 3250,
        rooms: [
          { name: 'Grand Living Area', x: 5, y: 5, w: 40, h: 45, type: 'living' },
          { name: 'Primary Bedroom', x: 50, y: 5, w: 25, h: 30, type: 'bed' },
          { name: 'Primary Bath', x: 75, y: 5, w: 20, h: 20, type: 'bath' },
          { name: 'Secondary Bedroom 1', x: 50, y: 40, w: 20, h: 25, type: 'bed' },
          { name: 'Secondary Bedroom 2', x: 72, y: 40, w: 23, h: 25, type: 'bed' },
          { name: 'Gourmet Kitchen', x: 5, y: 55, w: 20, h: 35, type: 'kitchen' },
          { name: 'Lakeview Balcony', x: 27, y: 55, w: 18, h: 35, type: 'balcony' },
          { name: 'Central Lobby', x: 30, y: 40, w: 15, h: 12, type: 'corridor' }
        ]
      },
      {
        levelName: 'Type B - 4,800 Sft (Penthouse Duplex)',
        sizeSqft: 4800,
        rooms: [
          { name: 'Double-Height Living Salon', x: 5, y: 5, w: 50, h: 50, type: 'living' },
          { name: 'Primary Suite & Walk-in Closet', x: 60, y: 5, w: 35, h: 40, type: 'bed' },
          { name: 'Primary Luxury Oasis Bath', x: 60, y: 48, w: 20, h: 22, type: 'bath' },
          { name: 'Ensuite Bedroom 1', x: 5, y: 60, w: 25, h: 35, type: 'bed' },
          { name: 'State-of-the-art Kitchen', x: 32, y: 60, w: 23, h: 35, type: 'kitchen' },
          { name: 'Panoramic Sky Deck', x: 82, y: 48, w: 13, h: 47, type: 'balcony' }
        ]
      },
      {
        levelName: 'Type C - 3,500 Sft (Premium Family Suite)',
        sizeSqft: 3500,
        rooms: [
          { name: 'Family Lounge', x: 5, y: 5, w: 45, h: 45, type: 'living' },
          { name: 'Master Suite', x: 55, y: 5, w: 30, h: 35, type: 'bed' },
          { name: 'Master Bath', x: 55, y: 45, w: 15, h: 25, type: 'bath' },
          { name: 'Bedroom 1', x: 75, y: 45, w: 20, h: 25, type: 'bed' },
          { name: 'Modern Kitchen', x: 5, y: 55, w: 25, h: 35, type: 'kitchen' },
          { name: 'Terrace', x: 35, y: 55, w: 15, h: 35, type: 'balcony' }
        ]
      },
      {
        levelName: 'Type D - 2,800 Sft (Urban Luxury)',
        sizeSqft: 2800,
        rooms: [
          { name: 'Open Living/Dining', x: 10, y: 10, w: 40, h: 40, type: 'living' },
          { name: 'Owner Retreat', x: 55, y: 10, w: 25, h: 35, type: 'bed' },
          { name: 'Ensuite Bath', x: 85, y: 10, w: 10, h: 25, type: 'bath' },
          { name: 'Guest Bedroom', x: 55, y: 50, w: 20, h: 30, type: 'bed' },
          { name: 'Kitchen & Pantry', x: 10, y: 55, w: 20, h: 25, type: 'kitchen' },
          { name: 'Balcony', x: 35, y: 55, w: 15, h: 25, type: 'balcony' }
        ]
      },
      {
        levelName: 'Type E - 4,200 Sft (Executive Residency)',
        sizeSqft: 4200,
        rooms: [
          { name: 'Grand Foyer', x: 5, y: 5, w: 20, h: 20, type: 'corridor' },
          { name: 'Executive Living', x: 30, y: 5, w: 60, h: 40, type: 'living' },
          { name: 'Master Quarters', x: 5, y: 50, w: 35, h: 40, type: 'bed' },
          { name: 'Luxury Bath', x: 5, y: 30, w: 20, h: 15, type: 'bath' },
          { name: 'Secondary Suite', x: 45, y: 50, w: 25, h: 40, type: 'bed' },
          { name: 'Chef Kitchen', x: 75, y: 50, w: 20, h: 40, type: 'kitchen' }
        ]
      },
      {
        levelName: 'Type F - 5,100 Sft (Presidential Suite)',
        sizeSqft: 5100,
        rooms: [
          { name: 'Reception Salon', x: 5, y: 5, w: 30, h: 40, type: 'living' },
          { name: 'Presidential Master', x: 40, y: 5, w: 40, h: 45, type: 'bed' },
          { name: 'Spa Bathroom', x: 85, y: 5, w: 10, h: 35, type: 'bath' },
          { name: 'VIP Guest Suite', x: 5, y: 50, w: 30, h: 35, type: 'bed' },
          { name: 'Gourmet Kitchen', x: 40, y: 55, w: 25, h: 30, type: 'kitchen' },
          { name: 'Wraparound Terrace', x: 70, y: 55, w: 25, h: 30, type: 'balcony' }
        ]
      },
      {
        levelName: 'Type G - 6,000 Sft (Royal Duplex)',
        sizeSqft: 6000,
        rooms: [
          { name: 'Majestic Living', x: 5, y: 5, w: 55, h: 50, type: 'living' },
          { name: 'Royal Master', x: 65, y: 5, w: 30, h: 45, type: 'bed' },
          { name: 'His/Her Baths', x: 65, y: 55, w: 15, h: 35, type: 'bath' },
          { name: 'Family Room', x: 5, y: 60, w: 30, h: 30, type: 'living' },
          { name: 'Show Kitchen', x: 40, y: 60, w: 20, h: 30, type: 'kitchen' },
          { name: 'Sky Garden', x: 85, y: 55, w: 10, h: 35, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'moon-imperial-residence',
    title: 'Al-Mizan Shopping Complex & Masjid Market',
    type: 'residential',
    status: 'completed',
    location: 'Road 11, Banani, Dhaka',
    area: 'Banani, Dhaka',
    sizeRange: '2,800 - 3,600 Sft',
    priceRange: 'Tk 5.8 - 8.2 Crore',
    beds: 3,
    baths: 4,
    imageUrl: 'https://lh3.googleusercontent.com/d/1z0rDLW4oNG-6S1PgrPxw0sIJXjUy22il',
    gallery: [
      'https://lh3.googleusercontent.com/d/1z0rDLW4oNG-6S1PgrPxw0sIJXjUy22il',
      'https://lh3.googleusercontent.com/d/1wEWP7jnw7J-5iZPkVoGmO2WGHbVIMgKw',
      'https://lh3.googleusercontent.com/d/1YIsq74s_I6wSx18nrzo3TCo2Egn_edT3',
      'https://lh3.googleusercontent.com/d/1CHR5Tleqb9yr-HikEffMtGxIoH_4UifH'
    ],
    description: 'An oasis of refined luxury. Designed by internationally acclaimed architects, Al-Mizan Shopping Complex & Masjid Market merges premium commercial & residential spaces, expansive floor-to-ceiling panoramic glass, and a boutique community ambiance in the heart of Banani.',
    features: [
      'Imported Italian Statuario marble floors',
      'Floor-to-ceiling soundproof double glazed windows',
      'Plush Reception Lounge with 24-hour concierge',
      'VRF Smart Central Air Conditioning',
      'Heated indoor swimming pool'
    ],
    amenities: [
      { icon: 'Smile', name: 'Boutique Kids Play Area' },
      { icon: 'ConciergeBell', name: '24/7 Professional Valet' },
      { icon: 'Flame', name: 'Sauna & Jacuzzi Spa' },
      { icon: 'Shield', name: 'State-of-Art Thermal Cameras' },
      { icon: 'Sparkles', name: 'Executive Event Lounge' }
    ],
    floorsCount: 14,
    completionYear: 2024,
    floorLayouts: [
      {
        levelName: 'Imperial Suite - 3,100 Sft',
        sizeSqft: 3100,
        rooms: [
          { name: 'Stately Living Pavilion', x: 5, y: 5, w: 45, h: 40, type: 'living' },
          { name: 'Emperor Master Bedroom', x: 55, y: 5, w: 25, h: 40, type: 'bed' },
          { name: 'His & Hers Marble Bath', x: 82, y: 5, w: 13, h: 25, type: 'bath' },
          { name: 'Princess Bedroom', x: 55, y: 50, w: 20, h: 45, type: 'bed' },
          { name: 'Chef\'s Exhibition Kitchen', x: 5, y: 50, w: 25, h: 45, type: 'kitchen' },
          { name: 'Sunset Dining Balcony', x: 32, y: 50, w: 18, h: 45, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'moon-corporate-plaza',
    title: 'Razia Tower',
    type: 'commercial',
    status: 'ongoing',
    location: 'Kamal Ataturk Avenue, Banani, Dhaka',
    area: 'Banani, Dhaka',
    sizeRange: '4,500 - 15,000 Sft',
    priceRange: 'Price on Request',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XwSyxMxjuTIj8IDAoAjfwv1o_pbAVvMV',
    gallery: [
      'https://lh3.googleusercontent.com/d/1XwSyxMxjuTIj8IDAoAjfwv1o_pbAVvMV',
      'https://lh3.googleusercontent.com/d/1t47uMtR24pb38As2UnAuuPi8dnMrqvYl',
      'https://lh3.googleusercontent.com/d/1fjOxjCXa3OSHRPro620UkBjFzDjlrqiu',
      'https://lh3.googleusercontent.com/d/1y3l3D13-d_rpjsZHXACFl5lxhDgqMCoR'
    ],
    description: 'The future of commercial excellence. Razia Tower is a highly sophisticated, Grade-A smart commercial tower offering multi-tiered structural redundancy, high-speed capsule elevators, and spectacular double-height commercial lobbies.',
    features: [
      'High-performance structural double glazed glass facade',
      'Advanced Building Management System (BMS)',
      '10 High-speed intelligent destination-controlled elevators',
      'Over 5 levels of automated basement car parking',
      'Fiber optic ultra-fast communication infrastructure'
    ],
    amenities: [
      { icon: 'Award', name: 'Grade-A Business Center' },
      { icon: 'Coffee', name: 'Panoramic Cafeteria' },
      { icon: 'Briefcase', name: 'Boardrooms & Co-working' },
      { icon: 'Cpu', name: 'Redundant Power Grid' },
      { icon: 'ShieldAlert', name: 'NFPA compliant fire system' }
    ],
    floorsCount: 30,
    launchDate: 'January 2026',
    handoverDate: 'December 2029',
    floorLayouts: [
      {
        levelName: 'Full Floor Corporate HQ - 12,000 Sft',
        sizeSqft: 12000,
        rooms: [
          { name: 'Open Office Workspace', x: 5, y: 5, w: 55, h: 60, type: 'living' },
          { name: 'Executive Director Suites', x: 65, y: 5, w: 30, h: 30, type: 'bed' },
          { name: 'Board Room', x: 65, y: 40, w: 30, h: 25, type: 'kitchen' },
          { name: 'Reception & Lift Lobby', x: 5, y: 70, w: 40, h: 25, type: 'corridor' },
          { name: 'Cafeteria Breakroom', x: 48, y: 70, w: 47, h: 25, type: 'balcony' }
        ]
      }
    ]
  },
  {
    id: 'moon-garden-penthouse',
    title: 'Josna Nir',
    type: 'residential',
    status: 'upcoming',
    location: 'Diplomatic Zone, Baridhara, Dhaka',
    area: 'Baridhara, Dhaka',
    sizeRange: '4,500 - 6,200 Sft',
    priceRange: 'Tk 12.0 - 18.5 Crore',
    beds: 4,
    baths: 5,
    imageUrl: 'https://lh3.googleusercontent.com/d/1xZ7UnlKaachkZH2D6LWhAm_fNZrfKTYx',
    gallery: [
      'https://lh3.googleusercontent.com/d/1xZ7UnlKaachkZH2D6LWhAm_fNZrfKTYx',
      'https://lh3.googleusercontent.com/d/1ipWRwMZ9rmEX0zlwXwZKj-AsRRipCuim',
      'https://lh3.googleusercontent.com/d/1z0rDLW4oNG-6S1PgrPxw0sIJXjUy22il',
      'https://lh3.googleusercontent.com/d/1wEWP7jnw7J-5iZPkVoGmO2WGHbVIMgKw'
    ],
    description: 'Indulge in ultra-exclusive residential living. Set in the highly secured Baridhara Diplomatic Zone, these select luxury penthouses boast private lap pools, vast botanical sky gardens, and state-of-the-art security integration.',
    features: [
      'Private keycard elevator access to your penthouse lobby',
      'Private rooftop heated lap pool and deck',
      'Architectural botanical integration with automated drip irrigation',
      'Advanced biometric and facial recognition entry systems',
      'Dedicated domestic helper quarters with separate access'
    ],
    amenities: [
      { icon: 'Waves', name: 'Private Lap Pool' },
      { icon: 'Shield', name: 'Diplomatic Grade Security' },
      { icon: 'Compass', name: 'Lakeview Vistas' },
      { icon: 'Wine', name: 'Rooftop BBQ & Lounge' },
      { icon: 'Eye', name: 'Private Concierge Team' }
    ],
    floorsCount: 12,
    launchDate: 'September 2026',
    handoverDate: 'June 2030',
    floorLayouts: [
      {
        levelName: 'Botanical Penthouse - 5,500 Sft',
        sizeSqft: 5500,
        rooms: [
          { name: 'Lakeview Lounge & Atrium', x: 5, y: 5, w: 50, h: 45, type: 'living' },
          { name: 'Imperial Master Sanctuary', x: 60, y: 5, w: 35, h: 35, type: 'bed' },
          { name: 'Wellness Bath & Steam Room', x: 60, y: 45, w: 18, h: 25, type: 'bath' },
          { name: 'Lush Botanical Terrace', x: 5, y: 55, w: 50, h: 40, type: 'balcony' },
          { name: 'Private Pool Lounge', x: 80, y: 45, w: 15, h: 50, type: 'balcony' },
          { name: 'Gourmet Exhibition Kitchen', x: 58, y: 75, w: 20, h: 20, type: 'kitchen' }
        ]
      }
    ]
  }
];
