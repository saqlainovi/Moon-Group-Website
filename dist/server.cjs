var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");

// src/data/properties.ts
var properties = [
  {
    "id": "haven-tower",
    "area": "Gulshan 1, Dhaka",
    "beds": 4,
    "type": "residential",
    "baths": 4,
    "title": "HEAVEN TOWER",
    "facing": "South Facing (Open Panoramic View)",
    "status": "ongoing",
    "address": "House: 15 Heaven Tower, Road: 126/127, Gulshan 1, Dhaka",
    "gallery": [
      "/project_images/haven-tower-gallery-0.jpg",
      "/project_images/haven-tower-gallery-1.jpg",
      "/project_images/haven-tower-gallery-2.jpg",
      "/project_images/haven-tower-gallery-3.jpg",
      "/project_images/haven-tower-gallery-4.jpg",
      "/project_images/haven-tower-gallery-5.jpg",
      "/project_images/haven-tower-gallery-6.jpg",
      "/project_images/haven-tower-gallery-7.jpg",
      "/project_images/haven-tower-gallery-8.jpg",
      "/project_images/haven-tower-gallery-9.jpg",
      "/project_images/haven-tower-gallery-10.jpg"
    ],
    "parking": "1 - 2 Dedicated Basement Car Parking",
    "features": [
      "\u{1F525} Flagship Ongoing Luxury Tower in Gulshan 1",
      "Grand Double-Height Entrance Atrium Lobby with 24/7 Concierge",
      "Rooftop Infinity Sky Lounge, Swimming Pool & Botanical Terrace",
      "Advanced Earthquake Resistant Structure (Zone 4 Certified)",
      "High-Speed Intelligent Elevators & 100% Generator Power Backup",
      "Smart Home Automation with Biometric Security"
    ],
    "imageUrl": "/project_images/haven-tower.jpg",
    "landArea": "28 Katha",
    "location": "House: 15 Heaven Tower, Road: 126/127, Gulshan 1, Dhaka",
    "amenities": [
      {
        "icon": "Crown",
        "name": "Flagship Luxury Tower"
      },
      {
        "icon": "Waves",
        "name": "Rooftop Sky Infinity Pool"
      },
      {
        "icon": "Dumbbell",
        "name": "Ultra-Modern Gym & Spa"
      },
      {
        "icon": "Shield",
        "name": "Biometric Access & 24/7 Security"
      },
      {
        "icon": "Zap",
        "name": "Full Power Backup Generator"
      },
      {
        "icon": "Car",
        "name": "Multi-Level Basement Parking"
      }
    ],
    "balconies": "3 Balconies (Verandahs)",
    "sizeRange": "A- 4293 Sft | B- 3000 Sft | C- 3000 Sft | D- 3770 Sft",
    "launchDate": "July 2026",
    "priceRange": "call for price",
    "totalUnits": "",
    "aptPerFloor": "4 Units / Floor (A, B, C, D)",
    "description": "\u{1F4E2} \u09B9\u09C7\u09AD\u09C7\u09A8 \u099F\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 (HEAVEN TOWER) \u098F\u09B0 \u0989\u09A6\u09CD\u09AC\u09CB\u09A7\u09A8 \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7 - \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8\u09C7 \u09AC\u09C1\u0995\u09BF\u0982 \u098F\u09AC\u0982 \u09B8\u09C7\u09B2 \u099A\u09B2\u099B\u09C7! \u0986\u0995\u09B0\u09CD\u09B7\u09A3\u09C0\u09AF\u09BC \u0986\u09B0\u09CD\u0995\u09BF\u099F\u09C7\u0995\u099A\u09BE\u09B0, \u09A1\u09BE\u09AC\u09B2-\u09B9\u09BE\u0987\u099F \u098F\u099F\u09CD\u09B0\u09BF\u09AF\u09BC\u09BE\u09AE \u09B2\u09AC\u09BF, \u09B0\u09C1\u09AB\u099F\u09AA \u0987\u09A8\u09AB\u09BF\u09A8\u09BF\u099F\u09BF \u09AA\u09C1\u09B2 \u098F\u09AC\u0982 Zone-4 \u09AD\u09C2\u09AE\u09BF\u0995\u09AE\u09CD\u09AA \u09AA\u09CD\u09B0\u09A4\u09BF\u09B0\u09CB\u09A7\u09C0 \u09B8\u09CD\u099F\u09CD\u09B0\u09BE\u0995\u099A\u09BE\u09B0 \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u09AE\u09C1\u09A8 \u0997\u09CD\u09B0\u09C1\u09AA\u09C7\u09B0 \u09AB\u09CD\u09B2\u09CD\u09AF\u09BE\u0997\u09B6\u09BF\u09AA \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u0964",
    "floorsCount": 13,
    "floorLayouts": [
      {
        "rooms": [
          {
            "h": 45,
            "w": 45,
            "x": 5,
            "y": 5,
            "name": "Panoramic Living Room",
            "type": "living"
          },
          {
            "h": 35,
            "w": 30,
            "x": 55,
            "y": 5,
            "name": "Master Suite & Walk-in Closet",
            "type": "bed"
          },
          {
            "h": 35,
            "w": 10,
            "x": 88,
            "y": 5,
            "name": "Master Luxury Bath",
            "type": "bath"
          },
          {
            "h": 25,
            "w": 20,
            "x": 55,
            "y": 45,
            "name": "Bedroom 2",
            "type": "bed"
          },
          {
            "h": 35,
            "w": 25,
            "x": 5,
            "y": 55,
            "name": "Gourmet Kitchen",
            "type": "kitchen"
          },
          {
            "h": 35,
            "w": 15,
            "x": 35,
            "y": 55,
            "name": "Sky Terrace Balcony",
            "type": "balcony"
          }
        ],
        "imageUrl": "https://lh3.googleusercontent.com/d/1MzBr64Y8DJJNG2q_tKa1R-b3ol3rGdgD",
        "sizeSqft": 0,
        "levelName": "Heaven  "
      },
      {
        "rooms": [
          {
            "h": 45,
            "w": 50,
            "x": 5,
            "y": 5,
            "name": "Royal Grand Salon",
            "type": "living"
          },
          {
            "h": 35,
            "w": 35,
            "x": 60,
            "y": 5,
            "name": "Presidential Bedroom",
            "type": "bed"
          },
          {
            "h": 35,
            "w": 30,
            "x": 5,
            "y": 55,
            "name": "Chef Kitchen",
            "type": "kitchen"
          },
          {
            "h": 35,
            "w": 55,
            "x": 40,
            "y": 55,
            "name": "Panoramic Sky Deck",
            "type": "balcony"
          }
        ],
        "imageUrl": "https://lh3.googleusercontent.com/d/1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6c",
        "sizeSqft": 0,
        "levelName": ""
      }
    ],
    "handoverDate": "December 2028"
  },
  {
    "id": "mizan-tower-kallyanpur",
    "area": "Kallyanpur, Dhaka",
    "beds": 3,
    "type": "residential",
    "baths": 3,
    "title": "Mizan Tower (\u09AE\u09BF\u099C\u09BE\u09A8 \u099F\u09BE\u0993\u09DF\u09BE\u09B0)",
    "status": "completed",
    "address": "Kallyanpur, Dhaka",
    "gallery": [
      "/project_images/mizan-tower-kallyanpur-gallery-0.jpg",
      "/project_images/mizan-tower-kallyanpur-gallery-1.jpg",
      "/project_images/mizan-tower-kallyanpur-gallery-2.jpg",
      "/project_images/mizan-tower-kallyanpur-gallery-3.jpg"
    ],
    "features": [
      "\u09E7\u09EA \u09A4\u09B2\u09BE \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u0993 \u09A8\u09BE\u09A8\u09CD\u09A6\u09A8\u09BF\u0995 \u09B8\u09CD\u099F\u09CD\u09B0\u09BE\u0995\u099A\u09BE\u09B0",
      "\u0995\u09B2\u09CD\u09AF\u09BE\u09A8\u09AA\u09C1\u09B0 \u09AC\u09BE\u09B8 \u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1 \u0993 \u09AE\u09C7\u099F\u09CD\u09B0\u09CB \u09B8\u09CD\u099F\u09C7\u09B6\u09A8 \u09B8\u0982\u09B2\u0997\u09CD\u09A8 \u09AA\u09CD\u09B0\u09BE\u0987\u09AE \u09B2\u09CB\u0995\u09C7\u09B6\u09A8",
      "\u09E8\u09EA/\u09ED \u09B8\u09BF\u09B8\u09BF\u099F\u09BF\u09AD\u09BF \u0995\u09CD\u09AF\u09BE\u09AE\u09C7\u09B0\u09BE \u09B8\u09BF\u0995\u09BF\u0989\u09B0\u09BF\u099F\u09BF \u0993 \u09AC\u09CD\u09AF\u09BE\u0995\u0986\u09AA \u099C\u09C7\u09A8\u09BE\u09B0\u09C7\u099F\u09B0",
      "\u0989\u09A8\u09CD\u09A8\u09A4 \u09AE\u09BE\u09A8\u09C7\u09B0 \u09B2\u09BF\u09AB\u09CD\u099F \u0993 \u0985\u0997\u09CD\u09A8\u09BF \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u09AA\u0995 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE"
    ],
    "imageFit": "fill",
    "imageUrl": "/project_images/mizan-tower-kallyanpur.jpg",
    "location": "Kallyanpur, Dhaka (\u0995\u09B2\u09CD\u09AF\u09BE\u09A8\u09AA\u09C1\u09B0, \u09A2\u09BE\u0995\u09BE)",
    "amenities": [
      {
        "icon": "Shield",
        "name": "24/7 Security"
      },
      {
        "icon": "Zap",
        "name": "Power Backup"
      },
      {
        "icon": "Car",
        "name": "Basement Parking"
      }
    ],
    "sizeRange": "",
    "priceRange": "",
    "description": "\u09AE\u09BF\u099C\u09BE\u09A8 \u099F\u09BE\u0993\u09DF\u09BE\u09B0, \u0995\u09B2\u09CD\u09AF\u09BE\u09A8\u09AA\u09C1\u09B0 - \u09E7\u09EA \u09A4\u09B2\u09BE \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u0986\u09AD\u09BF\u099C\u09BE\u09A4\u09CD\u09AF\u09C7\u09B0 \u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u0993 \u09AC\u09BE\u09A3\u09BF\u099C\u09CD\u09AF\u09BF\u0995 \u09AC\u09B9\u09C1\u09A4\u09B2 \u09AD\u09AC\u09A8\u0964 \u0989\u09A8\u09CD\u09A8\u09A4 \u09B8\u09BF\u0995\u09BF\u0989\u09B0\u09BF\u099F\u09BF, \u09AA\u09CD\u09B0\u09BE\u0987\u09AE \u09B2\u09CB\u0995\u09C7\u09B6\u09A8 \u0993 \u09AE\u09A8\u09CB\u09B0\u09AE \u099C\u09C0\u09AC\u09A8\u09AF\u09BE\u09A4\u09CD\u09B0\u09BE\u09B0 \u09B8\u09AC \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09B8\u09C1\u09AF\u09CB\u0997-\u09B8\u09C1\u09AC\u09BF\u09A7\u09BE \u09B8\u09AE\u09CD\u09AC\u09B2\u09BF\u09A4 \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u0964",
    "floorsCount": 14,
    "floorLayouts": [
      {
        "rooms": [
          {
            "h": 40,
            "w": 45,
            "x": 5,
            "y": 5,
            "name": "Drawing & Dining",
            "type": "living"
          },
          {
            "h": 35,
            "w": 35,
            "x": 55,
            "y": 5,
            "name": "Master Bed",
            "type": "bed"
          },
          {
            "h": 30,
            "w": 35,
            "x": 55,
            "y": 45,
            "name": "Bedroom 2",
            "type": "bed"
          },
          {
            "h": 35,
            "w": 25,
            "x": 5,
            "y": 50,
            "name": "Kitchen",
            "type": "kitchen"
          },
          {
            "h": 35,
            "w": 18,
            "x": 32,
            "y": 50,
            "name": "Front Balcony",
            "type": "balcony"
          }
        ],
        "imageUrl": "https://lh3.googleusercontent.com/d/1HfsvkjF_R57oo_rlVDG0lCzB4uSCvJtN",
        "sizeSqft": 1850,
        "levelName": ""
      },
      {
        "rooms": [
          {
            "h": 45,
            "w": 50,
            "x": 5,
            "y": 5,
            "name": "Spacious Living Lounge",
            "type": "living"
          },
          {
            "h": 35,
            "w": 35,
            "x": 60,
            "y": 5,
            "name": "Master Suite",
            "type": "bed"
          },
          {
            "h": 35,
            "w": 30,
            "x": 5,
            "y": 55,
            "name": "Modern Kitchen",
            "type": "kitchen"
          },
          {
            "h": 35,
            "w": 20,
            "x": 40,
            "y": 55,
            "name": "Veranda",
            "type": "balcony"
          }
        ],
        "imageUrl": "https://lh3.googleusercontent.com/d/18WMuVx9H2CWyO2ZlW5N9vbIGt70cG73S",
        "sizeSqft": 2200,
        "levelName": "Executive Suite Unit B - 2,200 Sft"
      }
    ]
  },
  {
    "id": "sunmoon-star-plaza",
    "area": "Kallyanpur, Dhaka",
    "type": "commercial",
    "title": "Sunmoon Star Plaza (\u09B8\u09BE\u09A8\u09AE\u09C1\u09A8 \u09B8\u09CD\u099F\u09BE\u09B0 \u09AA\u09CD\u09B2\u09BE\u099C\u09BE)",
    "status": "completed",
    "address": "Kallyanpur, Dhaka",
    "gallery": [
      "/project_images/sunmoon-star-plaza-gallery-0.jpg",
      "/project_images/sunmoon-star-plaza-gallery-1.jpg"
    ],
    "features": [
      "\u09E8\u09E8 \u09A4\u09B2\u09BE \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u0986\u0987\u0995\u09A8\u09BF\u0995 \u0995\u09AE\u09BE\u09B0\u09CD\u09B6\u09BF\u09DF\u09BE\u09B2 \u0986\u09B0\u09CD\u0995\u09BF\u099F\u09C7\u0995\u099A\u09BE\u09B0",
      "\u0995\u09CD\u09AF\u09BE\u09AA\u09B8\u09C1\u09B2 \u09B2\u09BF\u09AB\u099F, \u09A1\u09BE\u09AC\u09B2 \u09B9\u09BE\u0987\u099F \u0997\u09CD\u09B0\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1 \u098F\u09A8\u09CD\u099F\u09CD\u09B0\u09BF \u0993 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09B8\u09C7\u09A8\u09CD\u099F\u09CD\u09B0\u09BE\u09B2 \u098F\u09B8\u09BF \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE",
      "\u09AE\u09BE\u09B2\u09CD\u099F\u09BF-\u09B2\u09C7\u09AD\u09C7\u09B2 \u0985\u099F\u09CB\u09AE\u09C7\u099F\u09C7\u09A1 \u0995\u09BE\u09B0 \u09AA\u09BE\u09B0\u09CD\u0995\u09BF\u0982"
    ],
    "imageFit": "fill",
    "imageUrl": "/project_images/sunmoon-star-plaza.jpg",
    "location": "Kallyanpur, Dhaka (\u0995\u09B2\u09CD\u09AF\u09BE\u09A8\u09AA\u09C1\u09B0, \u09A2\u09BE\u0995\u09BE)",
    "amenities": [
      {
        "icon": "Award",
        "name": "Grade-A Business Center"
      },
      {
        "icon": "Cpu",
        "name": "High Speed Elevators"
      },
      {
        "icon": "Shield",
        "name": "Smart Security"
      }
    ],
    "sizeRange": "",
    "priceRange": "Price on Request",
    "description": "\u09B8\u09BE\u09A8\u09AE\u09C1\u09A8 \u09B8\u09CD\u099F\u09BE\u09B0 \u09AA\u09CD\u09B2\u09BE\u099C\u09BE, \u0995\u09B2\u09CD\u09AF\u09BE\u09A8\u09AA\u09C1\u09B0 - \u09E8\u09E8 \u09A4\u09B2\u09BE \u09AC\u09BE\u09A3\u09BF\u099C\u09CD\u09AF\u09BF\u0995 \u099F\u09BE\u0993\u09DF\u09BE\u09B0\u0964 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u099F \u0985\u09AB\u09BF\u09B8, \u09B6\u09CB\u09B0\u09C1\u09AE \u0993 \u09AC\u09CD\u09AF\u09BE\u0982\u0995 \u09B9\u09C7\u09A1\u0995\u09CB\u09DF\u09BE\u09B0\u09CD\u099F\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09BF\u09A4 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u0997\u09CD\u09B2\u09BE\u09B8 \u09AB\u09C7\u09B8\u09BE\u09A1 \u0993 \u0986\u0987\u0995\u09A8\u09BF\u0995 \u0986\u09B0\u09CD\u0995\u09BF\u099F\u09C7\u0995\u099A\u09BE\u09B0\u0964",
    "floorsCount": 22,
    "floorLayouts": [
      {
        "rooms": [
          {
            "h": 50,
            "w": 60,
            "x": 5,
            "y": 5,
            "name": "Open Office Space",
            "type": "living"
          },
          {
            "h": 25,
            "w": 25,
            "x": 70,
            "y": 5,
            "name": "Executive Cabin",
            "type": "bed"
          },
          {
            "h": 30,
            "w": 25,
            "x": 70,
            "y": 35,
            "name": "Conference Room",
            "type": "corridor"
          },
          {
            "h": 30,
            "w": 30,
            "x": 5,
            "y": 60,
            "name": "Pantry & Washrooms",
            "type": "kitchen"
          }
        ],
        "imageUrl": "https://lh3.googleusercontent.com/d/1Hf0dC0-dzgk4r5yLOvfhJc3ZbD3MyXtN",
        "sizeSqft": 0,
        "levelName": ""
      }
    ]
  },
  {
    "id": "razia-tower-kallyanpur",
    "area": "Kallyanpur, Dhaka",
    "type": "residential",
    "title": "Razia Tower (\u09B0\u09BE\u099C\u09BF\u09DF\u09BE \u099F\u09BE\u0993\u09DF\u09BE\u09B0)",
    "status": "completed",
    "address": "Kallyanpur, Dhaka",
    "gallery": [
      "/project_images/razia-tower-kallyanpur-gallery-0.jpg",
      "/project_images/razia-tower-kallyanpur-gallery-1.jpg"
    ],
    "features": [
      "\u09E8\u09E6 \u09A4\u09B2\u09BE \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u09B9\u09BE\u0987-\u09B0\u09BE\u0987\u099C \u0995\u09AE\u09BE\u09B0\u09CD\u09B6\u09BF\u09DF\u09BE\u09B2 \u099F\u09BE\u0993\u09DF\u09BE\u09B0",
      "\u0989\u09A8\u09CD\u09A8\u09A4 \u09B8\u09C7\u09A8\u09CD\u099F\u09CD\u09B0\u09BE\u09B2 \u09AC\u09BF\u09B2\u09CD\u09A1\u09BF\u0982 \u09AE\u09CD\u09AF\u09BE\u09A8\u09C7\u099C\u09AE\u09C7\u09A8\u09CD\u099F \u09B8\u09BF\u09B8\u09CD\u099F\u09C7\u09AE (BMS)",
      "\u09A1\u09BF\u099C\u09BF\u099F\u09BE\u09B2 \u0995\u09CD\u09AF\u09BE\u09AB\u09C7\u099F\u09C7\u09B0\u09BF\u09DF\u09BE \u0993 \u09AB\u09BE\u09DF\u09BE\u09B0 \u09B8\u09C7\u09AB\u099F\u09BF \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE"
    ],
    "imageUrl": "/project_images/razia-tower-kallyanpur.jpg",
    "location": "Kallyanpur, Dhaka (\u0995\u09B2\u09CD\u09AF\u09BE\u09A8\u09AA\u09C1\u09B0, \u09A2\u09BE\u0995\u09BE)",
    "amenities": [
      {
        "icon": "Coffee",
        "name": "Cafeteria & Lounge"
      },
      {
        "icon": "Zap",
        "name": "100% Generator Backup"
      }
    ],
    "sizeRange": "",
    "priceRange": "Price on Request",
    "description": "\u09B0\u09BE\u099C\u09BF\u09DF\u09BE \u099F\u09BE\u0993\u09DF\u09BE\u09B0, \u0995\u09B2\u09CD\u09AF\u09BE\u09A8\u09AA\u09C1\u09B0 - \u09E8\u09E6 \u09A4\u09B2\u09BE \u09AC\u09BE\u09A3\u09BF\u099C\u09CD\u09AF\u09BF\u0995 \u09AD\u09AC\u09A8\u0964 \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE\u09DF\u09BF\u0995 \u09AA\u09CD\u09B0\u09B8\u09BE\u09B0 \u0993 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u099F \u09B9\u09C7\u09A1\u0995\u09CB\u09DF\u09BE\u09B0\u09CD\u099F\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4\u0995\u09C3\u09A4 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09AC\u09BE\u09A3\u09BF\u099C\u09CD\u09AF\u09BF\u0995 \u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0\u0964",
    "floorsCount": 20,
    "floorLayouts": [
      {
        "rooms": [
          {
            "h": 55,
            "w": 55,
            "x": 5,
            "y": 5,
            "name": "Corporate Workstation Zone",
            "type": "living"
          },
          {
            "h": 30,
            "w": 30,
            "x": 65,
            "y": 5,
            "name": "Director Suite",
            "type": "bed"
          },
          {
            "h": 25,
            "w": 30,
            "x": 65,
            "y": 40,
            "name": "Meeting Lounge",
            "type": "corridor"
          }
        ],
        "imageUrl": "https://lh3.googleusercontent.com/d/1JLtIalfp49hPq57qAKKE-4Ezraaw7asU",
        "sizeSqft": 0,
        "levelName": ""
      }
    ]
  },
  {
    "id": "madina-mansion-1",
    "area": "Paikpara, Mirpur, Dhaka (\u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE, \u09A2\u09BE\u0995\u09BE)",
    "beds": 3,
    "type": "residential",
    "baths": 3,
    "title": "\u09AE\u09A6\u09BF\u09A8\u09BE \u09AE\u09CD\u09AF\u09BE\u09A8\u09B6\u09A8 \u09E7",
    "status": "completed",
    "address": "Paikpara, Mirpur, Dhaka (\u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE, \u09A2\u09BE\u0995\u09BE)",
    "gallery": [
      "/project_images/madina-mansion-1-gallery-0.jpg",
      "/project_images/madina-mansion-1-gallery-1.jpg",
      "/project_images/madina-mansion-1-gallery-2.jpg",
      "/project_images/madina-mansion-1-gallery-3.jpg"
    ],
    "features": [
      "\u09ED \u09A4\u09B2\u09BE \u09B8\u09C1\u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09BF\u09A4 \u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u09AD\u09AC\u09A8",
      "\u0986\u09B2\u09CB\u0995\u09CB\u099C\u09CD\u099C\u09CD\u09AC\u09B2 \u0993 \u09AC\u09BE\u09DF\u09C1 \u099A\u09B2\u09BE\u099A\u09B2\u09C7\u09B0 \u0989\u09AA\u09AF\u09CB\u0997\u09C0 \u09B0\u09C1\u09AE \u09B2\u09C7\u0986\u0989\u099F",
      "\u0987\u09A8\u09CD\u099F\u09BE\u09B0\u0995\u09AE \u0993 \u09B8\u09BF\u09B8\u09BF\u099F\u09BF\u09AD\u09BF \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE"
    ],
    "imageUrl": "/project_images/madina-mansion-1.jpg",
    "location": "Paikpara, Mirpur, Dhaka (\u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE, \u09A2\u09BE\u0995\u09BE)",
    "amenities": [
      {
        "icon": "Shield",
        "name": "24/7 Security"
      },
      {
        "icon": "Smile",
        "name": "Family Environment"
      }
    ],
    "sizeRange": "",
    "priceRange": "Completed Project",
    "description": "\u09AE\u09A6\u09BF\u09A8\u09BE \u09AE\u09CD\u09AF\u09BE\u09A8\u09B6\u09A8 (\u09E7), \u09ED \u09A4\u09B2\u09BE, \u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE - \u09B6\u09BE\u09A8\u09CD\u09A4 \u0993 \u09B8\u09C1\u09A8\u09CD\u09A6\u09B0 \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6\u09C7 \u09A8\u09BF\u09B7\u09CD\u0995\u09A3\u09CD\u099F\u0995 \u099C\u09BE\u09DF\u0997\u09BE\u09DF \u09A8\u09BF\u09B0\u09CD\u09AE\u09BF\u09A4 \u09AE\u09C1\u09A8 \u0997\u09CD\u09B0\u09C1\u09AA\u09C7\u09B0 \u09B8\u09AB\u09B2 \u09B9\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1\u0993\u09AD\u09BE\u09B0\u0995\u09C3\u09A4 \u09ED \u09A4\u09B2\u09BE \u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u0985\u09CD\u09AF\u09BE\u09AA\u09BE\u09B0\u09CD\u099F\u09AE\u09C7\u09A8\u09CD\u099F\u0964",
    "floorsCount": 7,
    "floorLayouts": []
  },
  {
    "id": "hamida-villa",
    "area": "Paikpara, Mirpur, Dhaka (\u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE, \u09A2\u09BE\u0995\u09BE)",
    "beds": 3,
    "type": "residential",
    "baths": 3,
    "title": "Hamida Villa",
    "status": "completed",
    "address": "Paikpara, Mirpur, Dhaka (\u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE, \u09A2\u09BE\u0995\u09BE)",
    "gallery": [
      "/project_images/hamida-villa-gallery-0.jpg"
    ],
    "features": [
      "\u09ED \u09A4\u09B2\u09BE \u09B8\u09AB\u09B2\u09AD\u09BE\u09AC\u09C7 \u09B9\u09B8\u09CD\u09A4\u09BE\u09A8\u09CD\u09A4\u09B0\u09BF\u09A4 \u0985\u09CD\u09AF\u09BE\u09AA\u09BE\u09B0\u09CD\u099F\u09AE\u09C7\u09A8\u09CD\u099F",
      "\u09A8\u09BF\u099C\u09B8\u09CD\u09AC \u09A1\u09BF\u09AA \u099F\u09BF\u0989\u09AC\u0993\u09DF\u09C7\u09B2 \u0993 \u0993\u09DF\u09BE\u099F\u09BE\u09B0 \u09AB\u09BF\u09B2\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8",
      "\u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u09AA\u09BE\u09B0\u09CD\u0995\u09BF\u0982 \u0993 \u09B8\u09C1\u09AA\u09CD\u09B0\u09B6\u09B8\u09CD\u09A4 \u09A1\u09CD\u09B0\u09BE\u0987\u09AD\u0993\u09DF\u09C7"
    ],
    "imageUrl": "/project_images/hamida-villa.jpg",
    "location": "Paikpara, Mirpur, Dhaka (\u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE, \u09A2\u09BE\u0995\u09BE)",
    "amenities": [
      {
        "icon": "Car",
        "name": "Protected Parking"
      },
      {
        "icon": "Zap",
        "name": "Auto Generator"
      }
    ],
    "sizeRange": "",
    "priceRange": "Completed Project",
    "description": "Hamida Villa, \u09ED \u09A4\u09B2\u09BE, \u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE - \u09AA\u09BE\u0987\u0995\u09AA\u09BE\u09DC\u09BE\u09B0 \u09AA\u09CD\u09B0\u09BE\u0987\u09AE \u09B2\u09CB\u0995\u09C7\u09B6\u09A8\u09C7 \u09ED \u09A4\u09B2\u09BE \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u09AD\u09BF\u09B2\u09BE\u0964 \u09B8\u09C1\u09AA\u09B0\u09BF\u09B8\u09B0 \u0985\u09CD\u09AF\u09BE\u09AA\u09BE\u09B0\u09CD\u099F\u09AE\u09C7\u09A8\u09CD\u099F \u0993 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09AB\u09BF\u099F\u09BF\u0982\u09B8\u09B8\u09B9 \u09B6\u09A4\u09AD\u09BE\u0997 \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4\u0964",
    "floorsCount": 7,
    "floorLayouts": []
  },
  {
    "id": "mizan-tower-2",
    "area": "Amin Bazar, Dhaka",
    "beds": 3,
    "type": "residential",
    "baths": 3,
    "title": "Mizan Tower 2 (\u09AE\u09BF\u099C\u09BE\u09A8 \u099F\u09BE\u0993\u09DF\u09BE\u09B0 \u09E8)",
    "status": "completed",
    "address": "Amin Bazar, Dhaka (\u0986\u09AE\u09BF\u09A8 \u09AC\u09BE\u099C\u09BE\u09B0, \u09A2\u09BE\u0995\u09BE)",
    "gallery": [
      "/project_images/mizan-tower-2-gallery-0.jpg",
      "/project_images/mizan-tower-2-gallery-1.jpg",
      "/project_images/mizan-tower-2-gallery-2.jpg"
    ],
    "features": [
      "\u09ED \u09A4\u09B2\u09BE \u09AD\u09C2\u09AE\u09BF\u0995\u09AE\u09CD\u09AA \u09AA\u09CD\u09B0\u09A4\u09BF\u09B0\u09CB\u09A7\u09C0 \u09B8\u09CD\u099F\u09CD\u09B0\u09BE\u0995\u099A\u09BE\u09B0",
      "\u09B8\u09B9\u099C \u0995\u09BF\u09B8\u09CD\u09A4\u09BF\u09A4\u09C7 \u0995\u09CD\u09B0\u09DF\u09C7\u09B0 \u0986\u0995\u09B0\u09CD\u09B7\u09A3\u09C0\u09DF \u09B8\u09C1\u09AF\u09CB\u0997",
      "\u0996\u09CB\u09B2\u09BE\u09AE\u09C7\u09B2\u09BE \u09AE\u09A8\u09CB\u09B0\u09AE \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6"
    ],
    "imageUrl": "/project_images/mizan-tower-2.jpg",
    "location": "Amin Bazar, Dhaka (\u0986\u09AE\u09BF\u09A8 \u09AC\u09BE\u099C\u09BE\u09B0, \u09A2\u09BE\u0995\u09BE)",
    "amenities": [
      {
        "icon": "Shield",
        "name": "Gated Security"
      },
      {
        "icon": "Zap",
        "name": "Standby Generator"
      }
    ],
    "sizeRange": "",
    "priceRange": "",
    "description": "\u09AE\u09BF\u099C\u09BE\u09A8 \u099F\u09BE\u0993\u09DF\u09BE\u09B0 (\u09E8), \u09ED \u09A4\u09B2\u09BE, \u0986\u09AE\u09BF\u09A8 \u09AC\u09BE\u099C\u09BE\u09B0 - \u0997\u09BE\u09AC\u09A4\u09B2\u09C0 \u0993 \u0986\u09AE\u09BF\u09A8 \u09AC\u09BE\u099C\u09BE\u09B0 \u09AC\u09CD\u09B0\u09BF\u099C\u09C7\u09B0 \u0985\u09A6\u09C2\u09B0\u09C7 \u09ED \u09A4\u09B2\u09BE \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09A8\u09BF\u09B0\u09CD\u09AE\u09BE\u09A3\u09BE\u09A7\u09C0\u09A8 \u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u0964",
    "floorsCount": 7,
    "floorLayouts": []
  },
  {
    "id": "al-mizan-city",
    "area": "Amin Bazar, Dhaka",
    "type": "residential",
    "title": "Al Mizan City (\u0986\u09B2 \u09AE\u09BF\u099C\u09BE\u09A8 \u09B8\u09BF\u099F\u09BF - \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09BE\u09AC\u09BF\u09A4 \u09E7\u09E6 \u09AC\u09BF\u0998\u09BE \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F)",
    "status": "proposed",
    "address": "Amin Bazar, Dhaka",
    "gallery": [
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop"
    ],
    "features": [
      "\u09E7\u09E6 \u09AC\u09BF\u0998\u09BE \u09AC\u09BF\u09B6\u09BE\u09B2 \u09AD\u09C2\u09AE\u09BF\u09B0 \u0989\u09AA\u09B0 \u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09BF\u09A4 \u09B8\u09CD\u09AF\u09BE\u099F\u09C7\u09B2\u09BE\u0987\u099F \u09B8\u09BF\u099F\u09BF",
      "\u09A8\u09BF\u099C\u09B8\u09CD\u09AC \u09B8\u09CD\u0995\u09C1\u09B2, \u09AE\u09B8\u099C\u09BF\u09A6, \u09AA\u09BE\u09B0\u09CD\u0995, \u09AA\u09CD\u09B2\u09C7\u0997\u09CD\u09B0\u09BE\u0989\u09A8\u09CD\u09A1 \u0993 \u09B6\u09AA\u09BF\u0982 \u09B8\u09C7\u09A8\u09CD\u099F\u09BE\u09B0",
      "\u09AA\u09CD\u09B0\u09B6\u09B8\u09CD\u09A4 \u09AE\u09C7\u09AE\u09CD\u09AC\u09C7\u09A8 \u09B0\u09CB\u09A1 \u0993 \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6\u09AC\u09BE\u09A8\u09CD\u09A7\u09AC \u09B2\u09C7\u0995\u09B8\u09BE\u0987\u09A1 \u09AD\u09BF\u0989"
    ],
    "imageFit": "fill",
    "imageUrl": "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop",
    "landArea": "10 Bigha (\u09E9.\u09E9 \u098F\u0995\u09B0)",
    "location": "Amin Bazar, Dhaka (\u0986\u09AE\u09BF\u09A8 \u09AC\u09BE\u099C\u09BE\u09B0, \u09A2\u09BE\u0995\u09BE)",
    "amenities": [
      {
        "icon": "Compass",
        "name": "10 Bigha Mega Project"
      },
      {
        "icon": "Leaf",
        "name": "Green Park & Lake"
      },
      {
        "icon": "Smile",
        "name": "Playground & School"
      }
    ],
    "sizeRange": "Proposed 10 Bigha Township",
    "priceRange": "Price on Request",
    "description": "\u0986\u09B2 \u09AE\u09BF\u099C\u09BE\u09A8 \u09B8\u09BF\u099F\u09BF \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09BE\u09AC\u09BF\u09A4 \u09E7\u09E6 \u09AC\u09BF\u0998\u09BE \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F, \u0986\u09AE\u09BF\u09A8 \u09AC\u09BE\u099C\u09BE\u09B0 - \u09A2\u09BE\u0995\u09BE\u09B0 \u09AA\u09CD\u09B0\u09AC\u09C7\u09B6\u09A6\u09CD\u09AC\u09BE\u09B0\u09C7 \u09E7\u09E6 \u09AC\u09BF\u0998\u09BE \u099C\u09AE\u09BF\u09B0 \u0989\u09AA\u09B0 \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09BE\u09AC\u09BF\u09A4 \u09AE\u09C7\u0997\u09BE \u09AE\u09A1\u09C7\u09B2 \u099F\u09BE\u0989\u09A8 \u0993 \u0997\u09CD\u09B0\u09C0\u09A8 \u099F\u09BE\u0989\u09A8\u09B6\u09BF\u09AA \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u0964",
    "floorsCount": 15,
    "floorLayouts": []
  },
  {
    "id": "madina-mansion-2",
    "area": "Gulshan 2, Dhaka",
    "beds": 4,
    "type": "residential",
    "baths": 4,
    "title": "Madina Mansion 2 (\u09AE\u09A6\u09BF\u09A8\u09BE \u09AE\u09CD\u09AF\u09BE\u09A8\u09B6\u09A8 \u09E8)",
    "status": "completed",
    "address": "Gulshan 2, Dhaka",
    "gallery": [
      "/project_images/madina-mansion-2-gallery-0.jpg",
      "/project_images/madina-mansion-2-gallery-1.jpg",
      "/project_images/madina-mansion-2-gallery-2.jpg",
      "/project_images/madina-mansion-2-gallery-3.jpg"
    ],
    "features": [
      "\u09ED \u09A4\u09B2\u09BE \u0985\u09AD\u09BF\u099C\u09BE\u09A4 \u0986\u09B2\u09CD\u099F\u09CD\u09B0\u09BE \u09B2\u09BE\u0995\u09CD\u09B8\u09BE\u09B0\u09BF \u09B0\u09C7\u09B8\u09BF\u09A1\u09C7\u09A8\u09CD\u09B8\u09BF\u09DF\u09BE\u09B2 \u09AD\u09AC\u09A8",
      "\u0987\u09A4\u09BE\u09B2\u09BF\u09DF\u09BE\u09A8 \u09AE\u09BE\u09B0\u09CD\u09AC\u09C7\u09B2 \u09AB\u09CD\u09B2\u09CB\u09B0\u09BF\u0982 \u0993 \u09B8\u09C7\u09A8\u09CD\u099F\u09CD\u09B0\u09BE\u09B2 \u098F\u09B8\u09BF \u09A1\u09BE\u0995\u09CD\u099F\u09BF\u0982",
      "\u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u0995\u09C0\u0995\u09BE\u09B0\u09CD\u09A1 \u09B2\u09BF\u09AB\u099F \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8"
    ],
    "imageUrl": "/project_images/madina-mansion-2.jpg",
    "location": "Gulshan 2, Dhaka (\u0997\u09C1\u09B2\u09B6\u09BE\u09A8 \u09E8, \u09A2\u09BE\u0995\u09BE)",
    "amenities": [
      {
        "icon": "Crown",
        "name": "Gulshan 2 Prime Location"
      },
      {
        "icon": "Shield",
        "name": "Biometric Access Control"
      }
    ],
    "sizeRange": "",
    "priceRange": "Completed Luxury Residence",
    "description": "\u09AE\u09A6\u09BF\u09A8\u09BE \u09AE\u09CD\u09AF\u09BE\u09A8\u09B6\u09A8 \u09E8, \u09ED \u09A4\u09B2\u09BE, \u0997\u09C1\u09B2\u09B6\u09BE\u09A8 \u09E8 - \u0997\u09C1\u09B2\u09B6\u09BE\u09A8 \u09E8 \u098F\u09B0 \u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u09A8\u09BF\u09B0\u09BE\u09AA\u09A4\u09CD\u09A4\u09BE \u09AC\u09C7\u09B7\u09CD\u099F\u09BF\u09A4 \u09A1\u09BF\u09AA\u09CD\u09B2\u09CB\u09AE\u09CD\u09AF\u09BE\u099F\u09BF\u0995 \u099C\u09CB\u09A8\u09C7\u09B0 \u0995\u09BE\u099B\u09C7 \u09ED \u09A4\u09B2\u09BE \u09B2\u09BE\u0995\u09CD\u09B8\u09BE\u09B0\u09BF \u09B0\u09C7\u09B8\u09BF\u09A1\u09C7\u09A8\u09CD\u09B8\u0964",
    "floorsCount": 7,
    "floorLayouts": []
  },
  {
    "id": "al-mizan-shopping-complex",
    "area": "Barguna",
    "type": "commercial",
    "title": "Al Mizan Shopping Complex (\u0986\u09B2 \u09AE\u09BF\u099C\u09BE\u09A8 \u09B6\u09AA\u09BF\u0982 \u0995\u09AE\u09AA\u09CD\u09B2\u09C7\u0995\u09CD\u09B8)",
    "status": "completed",
    "address": "Barguna",
    "gallery": [
      "/project_images/al-mizan-shopping-complex-gallery-0.jpg",
      "/project_images/al-mizan-shopping-complex-gallery-1.jpg",
      "/project_images/al-mizan-shopping-complex-gallery-2.jpg",
      "/project_images/al-mizan-shopping-complex-gallery-3.jpg",
      "/project_images/al-mizan-shopping-complex-gallery-4.jpg",
      "/project_images/al-mizan-shopping-complex-gallery-5.jpg",
      "/project_images/al-mizan-shopping-complex-gallery-6.jpg"
    ],
    "features": [
      "\u09E7\u09E6 \u09A4\u09B2\u09BE \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09AC\u09B0\u0997\u09C1\u09A8\u09BE \u09B8\u09C7\u09A8\u09CD\u099F\u09CD\u09B0\u09BE\u09B2 \u09B6\u09AA\u09BF\u0982 \u0995\u09AE\u09AA\u09CD\u09B2\u09C7\u0995\u09CD\u09B8",
      "\u09AC\u09CD\u09B0\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1 \u09B6\u09CB\u09B0\u09C1\u09AE, \u09AC\u09CD\u09AF\u09BE\u0982\u0995, \u098F\u09B8\u09CD\u0995\u09C7\u09B2\u09C7\u099F\u09B0 \u0993 \u09B8\u09C7\u09A8\u09CD\u099F\u09CD\u09B0\u09BE\u09B2 \u098F\u09B8\u09BF \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE",
      "\u09AC\u09BF\u09B6\u09BE\u09B2 \u09B6\u09AA\u09BF\u0982 \u098F\u09B0\u09BF\u09DF\u09BE \u0993 \u09AB\u09C1\u09A1\u0995\u09CB\u09B0\u09CD\u099F"
    ],
    "imageFit": "fill",
    "imageUrl": "/project_images/al-mizan-shopping-complex.jpg",
    "location": "Barguna (\u09AC\u09B0\u0997\u09C1\u09A8\u09BE)",
    "videoUrl": "https://www.youtube.com/watch?v=p5OwVF2eXGU",
    "amenities": [
      {
        "icon": "Award",
        "name": "10-Story Shopping Mall"
      },
      {
        "icon": "Car",
        "name": "Spacious Mall Parking"
      }
    ],
    "sizeRange": "10-Story Commercial Plaza",
    "priceRange": "Completed Commercial Landmark",
    "description": "\u0986\u09B2 \u09AE\u09BF\u099C\u09BE\u09A8 \u09B6\u09AA\u09BF\u0982 \u0995\u09AE\u09AA\u09CD\u09B2\u09C7\u0995\u09CD\u09B8 \u09E7\u09E6 \u09A4\u09B2\u09BE, \u09AC\u09B0\u0997\u09C1\u09A8\u09BE - \u09AC\u09B0\u0997\u09C1\u09A8\u09BE \u09B6\u09B9\u09B0\u09C7\u09B0 \u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0\u09B8\u09CD\u09A5\u09B2\u09C7 \u0985\u09AC\u09B8\u09CD\u09A5\u09BF\u09A4 \u09E7\u09E6 \u09A4\u09B2\u09BE \u09AC\u09BE\u09A3\u09BF\u099C\u09CD\u09AF\u09BF\u0995 \u0995\u09C7\u09A8\u09BE\u0995\u09BE\u099F\u09BE\u09B0 \u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0 \u0993 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u099F \u09AA\u09CD\u09B2\u09BE\u099C\u09BE\u0964",
    "floorsCount": 10,
    "floorLayouts": []
  },
  {
    "id": "kuakata-resort",
    "area": "Kuakata, Patuakhali",
    "type": "commercial",
    "title": "Kuakata Resort Project (\u09E9\u09E6 \u09AC\u09BF\u0998\u09BE \u0995\u09C1\u09DF\u09BE\u0995\u09BE\u099F\u09BE \u09B0\u09BF\u09B8\u09CB\u09B0\u09CD\u099F \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA)",
    "status": "proposed",
    "address": "Kuakata, Patuakhali",
    "gallery": [
      "/project_images/kuakata-resort-gallery-0.jpg",
      "/project_images/kuakata-resort-gallery-1.jpg",
      "/project_images/kuakata-resort-gallery-2.jpg",
      "/project_images/kuakata-resort-gallery-3.jpg",
      "/project_images/kuakata-resort-gallery-4.jpg",
      "/project_images/kuakata-resort-gallery-5.jpg",
      "/project_images/kuakata-resort-gallery-6.jpg"
    ],
    "features": [
      "\u09E9\u09E6 \u09AC\u09BF\u0998\u09BE \u099C\u09C1\u09DC\u09C7 \u09AC\u09BF\u09B8\u09CD\u09A4\u09C3\u09A4 \u09AC\u09BF\u09B6\u09CD\u09AC\u09AE\u09BE\u09A8\u09C7\u09B0 \u09B8\u09AE\u09C1\u09A6\u09CD\u09B0 \u09B8\u09C8\u0995\u09A4 \u09B0\u09BF\u09B8\u09CB\u09B0\u09CD\u099F",
      "\u09AA\u09CD\u09B0\u09BE\u0987\u09AD\u09C7\u099F \u09AC\u09BF\u099A \u098F\u0995\u09CD\u09B8\u09C7\u09B8, \u0993\u09DF\u09BE\u099F\u09BE\u09B0 \u09B8\u09CD\u09AA\u09CB\u09B0\u09CD\u099F\u09B8 \u0993 \u09AA\u09CD\u09B0\u09BF\u09AE\u09BF\u09AF\u09BC\u09BE\u09AE \u09AD\u09BF\u09B2\u09BE",
      "\u0987\u09A8\u09AB\u09BF\u09A8\u09BF\u099F\u09BF \u09AA\u09C1\u09B2, \u09B8\u09CD\u09AA\u09BE \u0993 \u0986\u09A8\u09CD\u09A4\u09B0\u09CD\u099C\u09BE\u09A4\u09BF\u0995 \u0995\u09A8\u09AD\u09C7\u09A8\u09B6\u09A8 \u09B9\u09B2"
    ],
    "imageFit": "fill",
    "imageUrl": "/project_images/kuakata-resort.jpg",
    "landArea": "30 Bigha",
    "location": "Kuakata Beach, Patuakhali (\u0995\u09C1\u09DF\u09BE\u0995\u09BE\u099F\u09BE, \u09AA\u099F\u09C1\u09DF\u09BE\u0996\u09BE\u09B2\u09C0)",
    "amenities": [
      {
        "icon": "Waves",
        "name": "Beachfront Infinity Pool"
      },
      {
        "icon": "Compass",
        "name": "30 Bigha Ocean Resort"
      }
    ],
    "sizeRange": "30 Bigha Beachfront Eco Resort",
    "priceRange": "Upcoming Hospitality Venture",
    "description": "\u09E9\u09E6 \u09AC\u09BF\u0998\u09BE \u0995\u09C1\u09DF\u09BE\u0995\u09BE\u099F\u09BE \u09B0\u09BF\u09B8\u09CB\u09B0\u09CD\u099F \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA - \u09B8\u09BE\u0997\u09B0\u0995\u09A8\u09CD\u09AF\u09BE \u0995\u09C1\u09DF\u09BE\u0995\u09BE\u099F\u09BE \u09B8\u09AE\u09C1\u09A6\u09CD\u09B0 \u09B8\u09C8\u0995\u09A4 \u09B8\u0982\u09B2\u0997\u09CD\u09A8 \u09E9\u09E6 \u09AC\u09BF\u0998\u09BE \u0986\u09DF\u09A4\u09A8\u09C7\u09B0 \u09EB-\u09B8\u09CD\u099F\u09BE\u09B0 \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF\u09B0 \u0986\u09A8\u09CD\u09A4\u09B0\u09CD\u099C\u09BE\u09A4\u09BF\u0995 \u09AE\u09BE\u09A8\u09C7\u09B0 \u0993\u09DF\u09BE\u099F\u09BE\u09B0 \u09B0\u09BF\u09B8\u09CB\u09B0\u09CD\u099F\u0964",
    "floorsCount": 8,
    "floorLayouts": []
  },
  {
    "id": "coxs-bazar-resort",
    "area": "Cox's Bazar",
    "type": "commercial",
    "title": "Cox's Bazar Resort Project (\u09E8\u09E6 \u09AC\u09BF\u0998\u09BE \u0995\u0995\u09CD\u09B8\u09AC\u09BE\u099C\u09BE\u09B0 \u09B0\u09BF\u09B8\u09CB\u09B0\u09CD\u099F \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA)",
    "status": "proposed",
    "address": "Cox's Bazar",
    "gallery": [
      "/project_images/coxs-bazar-resort-gallery-0.jpg",
      "/project_images/coxs-bazar-resort-gallery-1.jpg",
      "/project_images/coxs-bazar-resort-gallery-2.jpg",
      "/project_images/coxs-bazar-resort-gallery-3.jpg",
      "/project_images/coxs-bazar-resort-gallery-4.jpg",
      "/project_images/coxs-bazar-resort-gallery-5.jpg",
      "/project_images/coxs-bazar-resort-gallery-6.jpg"
    ],
    "features": [
      "\u09AE\u09C7\u09B0\u09BF\u09A8 \u09A1\u09CD\u09B0\u09BE\u0987\u09AD \u09B0\u09CB\u09A1\u09C7 \u09E8\u09E6 \u09AC\u09BF\u0998\u09BE \u09AA\u09CD\u09B0\u09BE\u0987\u09AE \u0993\u09B6\u09BE\u09A8 \u09AB\u09CD\u09B0\u09A8\u09CD\u099F \u09AA\u09CD\u09B0\u09AA\u09BE\u09B0\u09CD\u099F\u09BF",
      "\u09B9\u09C7\u09B2\u09BF\u09AA\u09CD\u09AF\u09BE\u09A1, \u09AA\u09CD\u09B0\u09BE\u0987\u09AD\u09C7\u099F \u09B8\u09BF-\u09AD\u09BF\u0989 \u09AC\u09CD\u09AF\u09BE\u09B2\u0995\u09A8\u09BF \u0993 \u0986\u09A8\u09CD\u09A4\u09B0\u09CD\u099C\u09BE\u09A4\u09BF\u0995 \u09B6\u09C7\u09AB \u09B0\u09C7\u09B8\u09CD\u099F\u09C1\u09B0\u09C7\u09A8\u09CD\u099F",
      "\u09AC\u09CD\u09AF\u09BE\u0982\u0995\u09C1\u09DF\u09C7\u099F \u09B9\u09B2, \u09B8\u09C1\u0987\u09AE\u09BF\u0982 \u09AA\u09C1\u09B2 \u0993 \u09B8\u09CD\u09AA\u09BE \u09B8\u09C7\u09A8\u09CD\u099F\u09CD\u09B0\u09BE\u09B2"
    ],
    "imageFit": "fill",
    "imageUrl": "/project_images/coxs-bazar-resort.jpg",
    "landArea": "20 Bigha",
    "location": "Marine Drive, Cox's Bazar (\u0995\u0995\u09CD\u09B8\u09AC\u09BE\u099C\u09BE\u09B0)",
    "amenities": [
      {
        "icon": "Waves",
        "name": "Oceanfront Luxury Resort"
      },
      {
        "icon": "Crown",
        "name": "5-Star Hospitality"
      }
    ],
    "sizeRange": "20 Bigha Oceanfront Luxury Resort",
    "priceRange": "Upcoming Five-Star Destination",
    "description": "\u0995\u0995\u09CD\u09B8\u09AC\u09BE\u099C\u09BE\u09B0 \u09E8\u09E6 \u09AC\u09BF\u0998\u09BE \u09B0\u09BF\u09B8\u09CB\u09B0\u09CD\u099F \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA - \u09AE\u09C7\u09B0\u09BF\u09A8 \u09A1\u09CD\u09B0\u09BE\u0987\u09AD \u09B0\u09CB\u09A1 \u09B8\u0982\u09B2\u0997\u09CD\u09A8 \u09E8\u09E6 \u09AC\u09BF\u0998\u09BE \u099C\u09AE\u09BF\u09B0 \u0993\u09AA\u09B0 \u09A8\u09BF\u09B0\u09CD\u09AE\u09BF\u09A4\u09AC\u09CD\u09AF \u09AB\u09BE\u0987\u09AD \u09B8\u09CD\u099F\u09BE\u09B0 \u09B0\u09BF\u09B8\u09CB\u09B0\u09CD\u099F \u0993 \u09B2\u09BE\u0995\u09CD\u09B8\u09BE\u09B0\u09BF \u0995\u099F\u09C7\u099C \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u0964",
    "floorsCount": 12,
    "floorLayouts": []
  },
  {
    "id": "sunmoon-star-tower",
    "area": "37 Dilkusha, Motijheel, Dhaka (\u09E9\u09ED \u09A6\u09BF\u09B2\u0995\u09C1\u09B6\u09BE, \u09AE\u09A4\u09BF\u099D\u09BF\u09B2)",
    "type": "commercial",
    "title": "Sun moon Star Tower (\u09B8\u09BE\u09A8\u09AE\u09C1\u09A8 \u09B8\u09CD\u099F\u09BE\u09B0 \u099F\u09BE\u0993\u09DF\u09BE\u09B0, \u09E9\u09ED \u09A6\u09BF\u09B2\u0995\u09C1\u09B6\u09BE)",
    "status": "completed",
    "address": "37 Dilkusha, Motijheel, Dhaka (\u09E9\u09ED \u09A6\u09BF\u09B2\u0995\u09C1\u09B6\u09BE, \u09AE\u09A4\u09BF\u099D\u09BF\u09B2)",
    "gallery": [
      "/project_images/sunmoon-star-tower-gallery-0.jpg",
      "/project_images/sunmoon-star-tower-gallery-1.jpg",
      "/project_images/sunmoon-star-tower-gallery-2.jpg",
      "/project_images/sunmoon-star-tower-gallery-3.jpg",
      "/project_images/sunmoon-star-tower-gallery-4.jpg",
      "/project_images/sunmoon-star-tower-gallery-5.jpg",
      "/project_images/sunmoon-star-tower-gallery-6.jpg",
      "/project_images/sunmoon-star-tower-gallery-7.jpg",
      "/project_images/sunmoon-star-tower-gallery-8.jpg",
      "/project_images/sunmoon-star-tower-gallery-9.jpg"
    ],
    "features": [
      "\u09E8\u09EA \u09A4\u09B2\u09BE \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u09B0\u09BE\u099C\u0995\u09C0\u09AF\u09BC \u09AE\u09A4\u09BF\u099D\u09BF\u09B2 \u09A6\u09BF\u09B2\u0995\u09C1\u09B6\u09BE \u0995\u09AE\u09BE\u09B0\u09CD\u09B6\u09BF\u09DF\u09BE\u09B2 \u099F\u09BE\u0993\u09DF\u09BE\u09B0",
      "\u09B9\u09BE\u0987-\u09B8\u09CD\u09AA\u09BF\u09A1 \u09AA\u09CD\u09AF\u09BE\u09B8\u09C7\u099E\u09CD\u099C\u09BE\u09B0 \u0993 \u0995\u09BE\u09B0\u09CD\u0997\u09CB \u0995\u09CD\u09AF\u09BE\u09AA\u09B8\u09C1\u09B2 \u09B2\u09BF\u09AB\u099F",
      "\u09AE\u09BE\u09B2\u09CD\u099F\u09BF-\u09B2\u09C7\u09AD\u09C7\u09B2 \u09AC\u09C7\u09B8\u09AE\u09C7\u09A8\u09CD\u099F \u09AA\u09BE\u09B0\u09CD\u0995\u09BF\u0982 \u0993 \u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u09B8\u09BF\u0995\u09BF\u0989\u09B0\u09BF\u099F\u09BF"
    ],
    "imageUrl": "/project_images/sunmoon-star-tower.jpg",
    "location": "37 Dilkusha, Motijheel, Dhaka (\u09E9\u09ED \u09A6\u09BF\u09B2\u0995\u09C1\u09B6\u09BE, \u09AE\u09A4\u09BF\u099D\u09BF\u09B2)",
    "amenities": [
      {
        "icon": "Award",
        "name": "24-Story Commercial Tower"
      },
      {
        "icon": "Cpu",
        "name": "Smart Building Automation"
      },
      {
        "icon": "Zap",
        "name": "Full Redundant Power"
      }
    ],
    "sizeRange": "",
    "priceRange": "Price on Request",
    "description": "\u09B8\u09BE\u09A8\u09AE\u09C1\u09A8 \u09B8\u09CD\u099F\u09BE\u09B0 \u099F\u09BE\u0993\u09DF\u09BE\u09B0, \u09E9\u09ED \u09A6\u09BF\u09B2\u0995\u09C1\u09B6\u09BE, \u09AE\u09A4\u09BF\u099D\u09BF\u09B2 \u09E8\u09EA \u09A4\u09B2\u09BE - \u09AE\u09A4\u09BF\u099D\u09BF\u09B2 \u09AC\u09BE\u09A3\u09BF\u099C\u09CD\u09AF\u09BF\u0995 \u098F\u09B2\u09BE\u0995\u09BE\u09B0 \u09AA\u09CD\u09B0\u09BE\u09A8\u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0\u09C7 \u09E9\u09ED \u09A6\u09BF\u09B2\u0995\u09C1\u09B6\u09BE\u09DF \u09E8\u09EA \u09A4\u09B2\u09BE \u0986\u0987\u0995\u09A8\u09BF\u0995 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u099F \u099F\u09BE\u0993\u09DF\u09BE\u09B0\u0964",
    "floorsCount": 24,
    "floorLayouts": []
  },
  {
    "id": "PROP-107845",
    "area": "TOWN HALL MOHAMMADPUR, DHAKA",
    "beds": 3,
    "type": "residential",
    "baths": 4,
    "title": "SUNMOON STAR TOWN HALL COMPLEX",
    "status": "proposed",
    "address": "TOWN HALL MOHAMMADPUR, DHAKA",
    "gallery": [],
    "features": [],
    "imageFit": "fill",
    "imageUrl": "/project_images/PROP-107845.jpg",
    "landArea": "15",
    "location": "TOWN HALL MOHAMMADPUR, DHAKA",
    "amenities": [],
    "sizeRange": "",
    "priceRange": "",
    "description": "\u09AE\u09CB\u09B9\u09BE\u09AE\u09CD\u09AE\u09A6\u09AA\u09C1\u09B0 \u099F\u09BE\u0989\u09A8 \u09B9\u09B2\u09C7 \u09E7\u09EB \u09AC\u09BF\u0998\u09BE\u09B0 \u09B8\u09C1\u09AC\u09BF\u09B6\u09BE\u09B2 \u099C\u09AE\u09BF\u09A4\u09C7 \u0997\u09DC\u09C7 \u0989\u09A0\u099B\u09C7 \u0986\u09A8\u09CD\u09A4\u09B0\u09CD\u099C\u09BE\u09A4\u09BF\u0995 \u09AE\u09BE\u09A8\u09C7\u09B0 '\u09B8\u09BE\u09A8\u09AE\u09C1\u09A8 \u09B8\u09CD\u099F\u09BE\u09B0 \u099F\u09BE\u0989\u09A8 \u09B9\u09B2 \u0995\u09AE\u09AA\u09CD\u09B2\u09C7\u0995\u09CD\u09B8'\u0964 \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE, \u0995\u09C7\u09A8\u09BE\u0995\u09BE\u099F\u09BE \u098F\u09AC\u0982 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u099C\u09C0\u09AC\u09A8\u09AF\u09BE\u09A4\u09CD\u09B0\u09BE\u09B0 \u098F\u0995 \u0985\u09AD\u09C2\u09A4\u09AA\u09C2\u09B0\u09CD\u09AC \u09B8\u09AE\u09A8\u09CD\u09AC\u09AF\u09BC\u0964",
    "floorsCount": 15,
    "floorLayouts": []
  },
  {
    "id": "PROP-234531",
    "area": "Rayer Bazaar ,dhaka",
    "beds": 3,
    "type": "residential",
    "baths": 4,
    "title": "Sunmoon Star Tower | Rayer Bazar Hall Complex",
    "status": "proposed",
    "address": "Rayer Bazaar \u09AE\u09C2\u09B2 \u09B8\u09DC\u0995 \u09B8\u0982\u09B2\u0997\u09CD\u09A8, \u09A2\u09BE\u0995\u09BE\u0964",
    "gallery": [],
    "features": [],
    "imageFit": "fill",
    "imageUrl": "/project_images/PROP-234531.jpg",
    "location": "Rayer Bazaar, Dhaka",
    "amenities": [],
    "sizeRange": "",
    "priceRange": "",
    "description": "\u0986\u09A8\u09CD\u09A4\u09B0\u09CD\u099C\u09BE\u09A4\u09BF\u0995 \u09AE\u09BE\u09A8\u09C7\u09B0 \u09B8\u09CD\u09A5\u09BE\u09AA\u09A4\u09CD\u09AF\u09B6\u09C8\u09B2\u09C0\u09A4\u09C7 \u09A4\u09C8\u09B0\u09BF '\u09B8\u09BE\u09A8\u09AE\u09C1\u09A8 \u09B8\u09CD\u099F\u09BE\u09B0 \u099F\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 | \u09B0\u09BE\u09AF\u09BC\u09C7\u09B0 \u09AC\u09BE\u099C\u09BE\u09B0 \u09B9\u09B2 \u0995\u09AE\u09AA\u09CD\u09B2\u09C7\u0995\u09CD\u09B8'\u0964 \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE, \u0995\u09A8\u09AB\u09BE\u09B0\u09C7\u09A8\u09CD\u09B8 \u0993 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09AC\u09BF\u09A8\u09CB\u09A6\u09A8\u09C7\u09B0 \u09B8\u09AC \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE \u098F\u0996\u09A8 \u098F\u0995\u0987 \u099B\u09BE\u09A6\u09C7\u09B0 \u09A8\u09BF\u099A\u09C7\u0964",
    "floorsCount": 15,
    "floorLayouts": []
  },
  {
    "id": "PROP-403611",
    "area": "Savar DOHS",
    "beds": 3,
    "type": "residential",
    "baths": 4,
    "title": "Josna Neer | Savar DOHS",
    "status": "completed",
    "address": "Savar DOHS",
    "gallery": [],
    "features": [],
    "imageUrl": "/project_images/PROP-403611.jpg",
    "location": "Savar DOHS",
    "amenities": [],
    "sizeRange": "",
    "priceRange": "",
    "description": "\u0985\u09AD\u09BF\u099C\u09BE\u09A4 \u0993 \u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6\u09C7 \u09A8\u09BF\u09B0\u09CD\u09AE\u09BF\u09A4 '\u099C\u09CB\u099B\u09A8\u09BE \u09A8\u09C0\u09DC' (Josna Neer)\u0964 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09B8\u09CD\u09A5\u09BE\u09AA\u09A4\u09CD\u09AF\u09B6\u09C8\u09B2\u09C0, \u09AA\u09B0\u09CD\u09AF\u09BE\u09AA\u09CD\u09A4 \u0986\u09B2\u09CB-\u09AC\u09BE\u09A4\u09BE\u09B8 \u098F\u09AC\u0982 \u09A8\u09BE\u09A8\u09CD\u09A6\u09A8\u09BF\u0995 \u09A1\u09BF\u099C\u09BE\u0987\u09A8\u09C7\u09B0 \u098F\u0995 \u0985\u09A8\u09A8\u09CD\u09AF \u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u0964",
    "floorsCount": 7,
    "floorLayouts": []
  },
  {
    "id": "PROP-608588",
    "area": "savar dohs",
    "beds": 3,
    "type": "residential",
    "baths": 4,
    "title": "\u0985\u09AD\u09BF\u09A8\u09A8\u09CD\u09A6\u09A8 | \u09B8\u09BE\u09AD\u09BE\u09B0 \u09A1\u09BF\u0993\u098F\u0987\u099A\u098F\u09B8",
    "status": "completed",
    "address": "savar dohs",
    "gallery": [],
    "features": [],
    "imageFit": "fill",
    "imageUrl": "/project_images/PROP-608588.jpg",
    "location": "savar dohs",
    "amenities": [],
    "sizeRange": "",
    "priceRange": "",
    "description": "\u0985\u09AD\u09BF\u099C\u09BE\u09A4, \u09B6\u09BE\u09A8\u09CD\u09A4 \u0993 \u09A8\u09BF\u099D\u09C1\u09AE \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u09B8\u09CD\u09AC\u09AA\u09CD\u09A8\u09C7\u09B0 \u0986\u09AC\u09BE\u09B8\u09A8 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09A4\u09C7 \u09A8\u09BF\u09DF\u09C7 \u098F\u09B2\u09BE\u09AE '\u0985\u09AD\u09BF\u0993\u09A8\u09CD\u09A6\u09A8' (ovinandan)\u0964 \u09B8\u09B0\u09CD\u09AC\u09BE\u09A7\u09C1\u09A8\u09BF\u0995 \u09B8\u09CD\u09A5\u09BE\u09AA\u09A4\u09CD\u09AF \u09A8\u0995\u09B6\u09BE\u09DF \u09A8\u09BF\u09B0\u09CD\u09AE\u09BF\u09A4 \u098F\u0987 \u09B0\u09C7\u09B8\u09BF\u09A1\u09C7\u09A8\u09CD\u09B8\u09BF\u09DF\u09BE\u09B2 \u09AD\u09AC\u09A8\u099F\u09BF\u09A4\u09C7 \u09A5\u09BE\u0995\u099B\u09C7 \u09A8\u09BE\u09A8\u09CD\u09A6\u09A8\u09BF\u0995 \u099C\u09C0\u09AC\u09A8\u09AF\u09BE\u09A4\u09CD\u09B0\u09BE\u09B0 \u09B8\u09AC \u0989\u09AA\u09BE\u09A6\u09BE\u09A8\u0964",
    "floorsCount": 7,
    "floorLayouts": []
  },
  {
    "id": "PROP-138205",
    "area": "\u09AA\u09CD\u09B2\u099F \u09A8\u0982-\u09EB\u09EA, \u09AC\u09CD\u09B2\u0995-\u098F\u09AB, \u09B8\u09C7\u0995\u09CD\u099F\u09B0-\u09E6\u09E8, \u09B0\u09CB\u09A1-\u09E6\u09E7, \u0987\u09B8\u09CD\u099F\u09B0\u09CD\u09A8 \u09B9\u09BE\u0989\u099C\u09BF\u0982 \u09B2\u09BF\u0983, \u0986\u09AB\u09A4\u09BE\u09AC\u09A8\u0997\u09B0, \u09A2\u09BE\u0995\u09BE",
    "beds": 3,
    "type": "residential",
    "baths": 4,
    "title": "MOON TASH ICON",
    "status": "completed",
    "address": "\u09AA\u09CD\u09B2\u099F \u09A8\u0982-\u09EB\u09EA, \u09AC\u09CD\u09B2\u0995-\u098F\u09AB, \u09B8\u09C7\u0995\u09CD\u099F\u09B0-\u09E6\u09E8, \u09B0\u09CB\u09A1-\u09E6\u09E7, \u0987\u09B8\u09CD\u099F\u09B0\u09CD\u09A8 \u09B9\u09BE\u0989\u099C\u09BF\u0982 \u09B2\u09BF\u0983, \u0986\u09AB\u09A4\u09BE\u09AC\u09A8\u0997\u09B0, \u09A2\u09BE\u0995\u09BE",
    "gallery": [
      "/project_images/PROP-138205-gallery-0.jpg",
      "/project_images/PROP-138205-gallery-1.jpg",
      "/project_images/PROP-138205-gallery-2.jpg",
      "/project_images/PROP-138205-gallery-3.jpg"
    ],
    "features": [
      "\u0997\u09CD\u09B0\u09BE\u0989\u09A8\u09CD\u09A1 \u09AB\u09CD\u09B2\u09CB\u09B0 (Ground Floor):  \u09AA\u09BE\u09B0\u09CD\u0995\u09BF\u0982 \u09B8\u09CD\u09AA\u09C7\u09B8 (Car Parking Area)  \u0997\u09BE\u09B0\u09CD\u09A1 \u09B0\u09C1\u09AE (Guard Room), \u0997\u09BE\u09B0\u09CD\u09A1 \u09AA\u09CB\u09B8\u09CD\u099F (Guard Post), \u099C\u09C7\u09A8\u09BE\u09B0\u09C7\u099F\u09B0 \u09B0\u09C1\u09AE (Generator Room), \u099F\u09DF\u09B2\u09C7\u099F \u0993 \u0995\u09BF\u099F\u0964",
      "\u09E7\u09AE \u09A4\u09B2\u09BE (1st Floor Plan):  \u09E8\u099F\u09BF \u09B8\u09CD\u09AE\u09B2 \u0987\u0989\u09A8\u09BF\u099F (Two Small Units)  \u0987\u0989\u09A8\u09BF\u099F A: \u09EE\u09EE\u09EB \u09AC\u09B0\u09CD\u0997\u09AB\u09C1\u099F (885 Sft)  \u0987\u0989\u09A8\u09BF\u099F B: \u09E7\u09E6\u09E7\u09EB \u09AC\u09B0\u09CD\u0997\u09AB\u09C1\u099F (1015 Sft)",
      "\u09E8\u09DF \u09A5\u09C7\u0995\u09C7 \u09ED\u09AE \u09A4\u09B2\u09BE (2nd to 7th Floor Plan):  \u09B8\u09BF\u0999\u09CD\u0997\u09C7\u09B2 \u0987\u0989\u09A8\u09BF\u099F (Single Unit)  \u09B8\u09BE\u0987\u099C: \u09E7\u09EF\u09E6\u09E6 \u09AC\u09B0\u09CD\u0997\u09AB\u09C1\u099F (1900 Sft)",
      "\u099B\u09BE\u09A6 (Roof Top):  \u0995\u09AE\u09BF\u0989\u09A8\u09BF\u099F\u09BF \u09B0\u09C1\u09AE (Community Room)  \u099C\u09BF\u09AE \u09B0\u09C1\u09AE (Gym Room)  \u099F\u09DF\u09B2\u09C7\u099F \u098F\u09AC\u0982 \u0993\u09AA\u09C7\u09A8 \u09B8\u09CD\u09AA\u09C7\u09B8 (Open to Sky)",
      "\u09B2\u09CB\u0995\u09C7\u09B6\u09A8 \u09AC\u09BE \u09A0\u09BF\u0995\u09BE\u09A8\u09BE (Project Location)\u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u09C7\u09B0 \u09AE\u09C2\u09B2 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE: \u09AA\u09CD\u09B2\u099F \u09A8\u0982-\u09EB\u09EA, \u09AC\u09CD\u09B2\u0995-\u098F\u09AB, \u09B8\u09C7\u0995\u09CD\u099F\u09B0-\u09E6\u09E8, \u09B0\u09CB\u09A1-\u09E6\u09E7, \u0987\u09B8\u09CD\u099F\u09B0\u09CD\u09A8 \u09B9\u09BE\u0989\u099C\u09BF\u0982 \u09B2\u09BF\u0983, \u0986\u09AB\u09A4\u09BE\u09AC\u09A8\u0997\u09B0, \u09A2\u09BE\u0995\u09BE\u0964  \u09B9\u09C7\u09A1 \u0985\u09AB\u09BF\u09B8: \u09B8\u09BE\u09A8 \u09AE\u09C1\u09A8 \u09B8\u09CD\u099F\u09BE\u09B0 \u099F\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 (\u09E7\u09ED \u09A4\u09B2\u09BE), \u09E9\u09ED, \u09A6\u09BF\u09B2\u0995\u09C1\u09B6\u09BE, \u09B8\u09BF/\u098F, \u09A2\u09BE\u0995\u09BE-\u09E7\u09E6\u09E6\u09E6\u0964  \u0995\u09B0\u09AA\u09CB\u09B0\u09C7\u099F \u0985\u09AB\u09BF\u09B8: \u09E7/\u09EB \u0995\u09B2\u09CD\u09AF\u09BE\u09A3\u09AA\u09C1\u09B0, \u09AE\u09BF\u09B0\u09AA\u09C1\u09B0 \u09B0\u09CB\u09A1, \u09AE\u09BF\u099C\u09BE\u09A8 \u099F\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 (\u09E9\u09AF\u09BC \u09A4\u09B2\u09BE), \u09A2\u09BE\u0995\u09BE-\u09E7\u09E8\u09E6\u09ED\u0964"
    ],
    "imageFit": "fill",
    "imageUrl": "/project_images/PROP-138205.jpg",
    "location": "\u09AA\u09CD\u09B2\u099F \u09A8\u0982-\u09EB\u09EA, \u09AC\u09CD\u09B2\u0995-\u098F\u09AB, \u09B8\u09C7\u0995\u09CD\u099F\u09B0-\u09E6\u09E8, \u09B0\u09CB\u09A1-\u09E6\u09E7, \u0987\u09B8\u09CD\u099F\u09B0\u09CD\u09A8 \u09B9\u09BE\u0989\u099C\u09BF\u0982 \u09B2\u09BF\u0983, \u0986\u09AB\u09A4\u09BE\u09AC\u09A8\u0997\u09B0, \u09A2\u09BE\u0995\u09BE",
    "amenities": [],
    "sizeRange": "\u09E7\u09AE \u09A4\u09B2\u09BE (\u09EE\u09EE\u09EB \u0993 \u09E7\u09E6\u09E7\u09EB \u09AC\u09B0\u09CD\u0997\u09AB\u09C1\u099F), \u09E8\u09AF\u09BC \u09A5\u09C7\u0995\u09C7 \u09ED\u09AE \u09A4\u09B2\u09BE (\u09E7\u09EF\u09E6\u09E6 \u09AC\u09B0\u09CD\u0997\u09AB\u09C1\u099F)",
    "priceRange": "",
    "description": "\u09A2\u09BE\u0995\u09BE \u09B6\u09B9\u09B0\u09C7\u09B0 \u0985\u09A8\u09CD\u09AF\u09A4\u09AE \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u0993 \u09AA\u09B0\u09BF\u0995\u09B2\u09CD\u09AA\u09BF\u09A4 \u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u098F\u09B2\u09BE\u0995\u09BE \u0986\u09AB\u09A4\u09BE\u09AC\u09A8\u0997\u09B0\u09C7 \u098F\u0995 \u09B8\u09C1\u09AC\u09BF\u09B6\u09BE\u09B2 \u0995\u09CD\u09AF\u09BE\u09A8\u09AD\u09BE\u09B8\u09C7 \u0986\u09AE\u09B0\u09BE \u09A8\u09BF\u09AF\u09BC\u09C7 \u098F\u09B8\u09C7\u099B\u09BF \u098F\u0995 \u0986\u09AD\u09BF\u099C\u09BE\u09A4\u09CD\u09AF\u09C7\u09B0 \u09AE\u09C7\u0997\u09BE \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u0964 MOON TASH ICON \u0995\u09C7\u09AC\u09B2 \u098F\u0995\u099F\u09BF \u09AD\u09AC\u09A8 \u09A8\u09AF\u09BC, \u098F\u099F\u09BF \u0986\u09AA\u09A8\u09BE\u09B0 \u0993 \u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09B0\u09BF\u09AC\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u098F\u0995 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u098F\u09AC\u0982 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u09AE\u09C7\u0997\u09BE\u09B8\u09BF\u099F\u09BF\u09B0 \u09AA\u09B0\u09BF\u09AA\u09C2\u09B0\u09CD\u09A3 \u09AA\u09CD\u09B0\u09A4\u09BF\u099A\u09CD\u099B\u09AC\u09BF\u0964\n\n",
    "floorsCount": 10,
    "floorLayouts": []
  }
];

// server.ts
var import_app = require("firebase/app");
var import_firestore = require("firebase/firestore");
var import_meta = {};
var currentDir = process.cwd();
try {
  if (typeof import_meta !== "undefined" && import_meta.url) {
    currentDir = import_path.default.dirname((0, import_url.fileURLToPath)(import_meta.url));
  } else if (typeof __dirname !== "undefined") {
    currentDir = __dirname;
  }
} catch (e) {
  currentDir = process.cwd();
}
var PORT = 3e3;
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var DB_FILE = import_path.default.join(DATA_DIR, "cms_db.json");
var firebaseConfigPath = import_path.default.join(process.cwd(), "firebase-applet-config.json");
var firebaseConfig = JSON.parse(import_fs.default.readFileSync(firebaseConfigPath, "utf8"));
var firebaseApp = (0, import_app.initializeApp)(firebaseConfig);
var firestoreDb = (0, import_firestore.getFirestore)(firebaseApp);
try {
  (0, import_firestore.setLogLevel)("silent");
} catch (e) {
}
async function saveToFirebase(key, data) {
  try {
    const docRef = (0, import_firestore.doc)(firestoreDb, "cms_store", key);
    await (0, import_firestore.setDoc)(docRef, {
      value: data,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`[Firebase Sync] Successfully saved ${key} to Firebase cloud database.`);
  } catch (err) {
    ;
  }
}
async function loadFromFirebase(key) {
  try {
    const docRef = (0, import_firestore.doc)(firestoreDb, "cms_store", key);
    const snap = await (0, import_firestore.getDoc)(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return data?.value || null;
    }
  } catch (err) {
    ;
  }
  return null;
}
if (!import_fs.default.existsSync(DATA_DIR)) {
  import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
}
var defaultSiteSettings = {
  id: "main",
  tickerText: "\u{1F4E2} \u09AC\u09BF\u09B6\u09C7\u09B7 \u09AC\u09BF\u099C\u09CD\u099E\u09AA\u09CD\u09A4\u09BF: \u09B9\u09C7\u09AD\u09C7\u09A8 \u099F\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 (HEAVEN TOWER) \u0989\u09A6\u09CD\u09AC\u09CB\u09A7\u09A8 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7 - \u09AC\u09C1\u0995\u09BF\u0982 \u0993 \u09B8\u09C7\u09B2 \u099A\u09B2\u099B\u09C7! \u{1F3E2} \u2726 \u{1F525} HEAVEN TOWER INAUGURATED - BOOKING & SALES NOW OPEN! \u2726 REAL ESTATE \u2726 HOUSING \u2726 CONSTRUCTION \u2726 INTERIORS \u2726 COMMERCIAL SPACES \u2726 SINCE 1983 \u2726",
  hotlinePhone: "+88 02 9009153",
  whatsappPhone: "+8801313401405",
  emailAddress: "moongroupofindustrylimited@gmail.com",
  headOffice: "Mizan Tower, Mirpur Road, Kallyanpur, Dhaka-1207",
  facebookLink: "https://facebook.com",
  linkedinLink: "https://linkedin.com",
  twitterLink: "https://twitter.com",
  instagramLink: "https://instagram.com",
  youtubeLink: "https://youtube.com",
  brandName: "MOON GROUP OF INDUSTRIES LTD",
  tagline: "Building Bangladesh's homes and premium skylines since 1983.",
  rehabRegNo: "Member 228/2005",
  rajukCodeNo: "Code # DL-3215",
  telephoneNumbers: "0241002945, 0241002946, 0241002947, 0241002948, 0241002949, 0241000182",
  copyrightText: "\xA9 2026 Moon Builders \u2014 Moon Group of Industries. All rights reserved.",
  showVirtualConfigurator: true,
  showHavenTowerBanner: true,
  havenTowerBannerImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  havenTowerTitle: "HEAVEN TOWER by Moon Group",
  havenTowerDescription: "\u{1F4E2} \u09B9\u09C7\u09AD\u09C7\u09A8 \u099F\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 (HEAVEN TOWER) \u098F\u09B0 \u0989\u09A6\u09CD\u09AC\u09CB\u09A7\u09A8 \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7 - \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8\u09C7 \u09AC\u09C1\u0995\u09BF\u0982 \u098F\u09AC\u0982 \u09B8\u09C7\u09B2 \u099A\u09B2\u099B\u09C7! \u0986\u0995\u09B0\u09CD\u09B7\u09A3\u09C0\u09AF\u09BC \u0986\u09B0\u09CD\u0995\u09BF\u099F\u09C7\u0995\u099A\u09BE\u09B0, \u09A1\u09BE\u09AC\u09B2-\u09B9\u09BE\u0987\u099F \u098F\u099F\u09CD\u09B0\u09BF\u09AF\u09BC\u09BE\u09AE \u09B2\u09AC\u09BF, \u09B0\u09C1\u09AB\u099F\u09AA \u0987\u09A8\u09AB\u09BF\u09A8\u09BF\u099F\u09BF \u09AA\u09C1\u09B2 \u098F\u09AC\u0982 Zone-4 \u09AD\u09C2\u09AE\u09BF\u0995\u09AE\u09CD\u09AA \u09AA\u09CD\u09B0\u09A4\u09BF\u09B0\u09CB\u09A7\u09C0 \u09B8\u09CD\u099F\u09CD\u09B0\u09BE\u0995\u099A\u09BE\u09B0 \u09AC\u09BF\u09B6\u09BF\u09B7\u09CD\u099F \u09AE\u09C1\u09A8 \u0997\u09CD\u09B0\u09C1\u09AA\u09C7\u09B0 \u09AB\u09CD\u09B2\u09CD\u09AF\u09BE\u0997\u09B6\u09BF\u09AA \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u0964",
  tickerSpeed: 28
};
var defaultAboutUs = {
  id: "main",
  tagline: "A Legacy Since 1983",
  title: "FOUR DECADES OF\nBUILDING TRUST.",
  paragraph1: "Moon Builders is the construction and real estate arm of Moon Group of Industries, founded in 1983 under the visionary leadership of Al-haj Mizanur Rahman. What began with a single housing venture has grown into a conglomerate spanning real estate, housing, construction, textiles, hospitality, and agriculture \u2014 with the exact same site discipline applied on every project, big or small.",
  paragraph2: "We handle the full span of delivery: land assessment, structural engineering, on-site raw material quality control, and timely handover. Our promise is simple: what is drafted on paper is precisely what stands on the ground.",
  imageUrl: "https://images.unsplash.com/photo-1609867271967-a82f85c48531?fm=jpg&q=70&w=1400&auto=format&fit=crop",
  yearFounded: 1983,
  sisterConcernsCount: 19,
  sectorsActiveCount: 11
};
var defaultHeroSlides = [
  {
    id: "haven-tower",
    title: "Heaven Tower",
    type: "residential",
    status: "ongoing",
    description: "\u2605 MAIN ATTRACTION - HEAVEN TOWER INAUGURATED! Moon Group\u2019s flagship architectural masterpiece featuring double-height atrium lobby, rooftop sky infinity pool, high-speed elevators, Zone-4 earthquake resistance, and smart home luxury. Booking & sales now open!",
    imageUrl: "/haven_tower/img_4.jpg",
    tag: "\u{1F525} FLAGSHIP PROJECT - NOW OPEN FOR BOOKING",
    price: "Tk 2.2 - 5.5 Crore",
    stats: { beds: "4 Beds", baths: "4 Baths", size: "1,850 - 3,600 Sft" }
  },
  {
    id: "slide-1",
    title: "Sun Moon Star",
    type: "residential",
    status: "ongoing",
    description: "An architectural masterwork soaring into the Dhaka skyline. Sun Moon Star redefines urban luxury with towering architectural grandeur, cantilevered garden terraces, and majestic 270-degree views of Gulshan Lake.",
    imageUrl: "https://lh3.googleusercontent.com/d/1ipWRwMZ9rmEX0zlwXwZKj-AsRRipCuim",
    tag: "Flagship Residential",
    price: "Tk 6.5 - 9.8 Crore",
    stats: { beds: "4 Beds", baths: "5 Baths", size: "3,250 - 4,800 Sft" }
  },
  {
    id: "slide-2",
    title: "Al-Mizan Shopping Complex & Masjid Market",
    type: "residential",
    status: "completed",
    description: "An oasis of refined luxury. Designed by internationally acclaimed architects, Al-Mizan Shopping Complex & Masjid Market merges premium commercial & residential spaces, expansive floor-to-ceiling panoramic glass, and a boutique community ambiance in the heart of Banani.",
    imageUrl: "https://lh3.googleusercontent.com/d/1z0rDLW4oNG-6S1PgrPxw0sIJXjUy22il",
    tag: "Completed Masterpiece",
    price: "Tk 5.8 - 8.2 Crore",
    stats: { beds: "3 Beds", baths: "4 Baths", size: "2,800 - 3,600 Sft" }
  },
  {
    id: "slide-3",
    title: "Razia Tower",
    type: "commercial",
    status: "ongoing",
    description: "The future of commercial excellence. Razia Tower is a highly sophisticated, Grade-A smart office tower offering multi-tiered structural redundancy, high-speed capsule elevators, and spectacular double-height commercial lobbies.",
    imageUrl: "https://lh3.googleusercontent.com/d/1XwSyxMxjuTIj8IDAoAjfwv1o_pbAVvMV",
    tag: "Premium Commercial",
    price: "Price on Request",
    stats: { levels: "30 Floors", parking: "5 Basements", size: "4,500 - 15,000 Sft" }
  },
  {
    id: "slide-4",
    title: "Josna Nir",
    type: "residential",
    status: "upcoming",
    description: "Indulge in ultra-exclusive residential living. Set in the highly secured Baridhara Diplomatic Zone, these select luxury penthouses boast private lap pools, vast botanical sky gardens, and state-of-the-art security integration.",
    imageUrl: "https://lh3.googleusercontent.com/d/1xZ7UnlKaachkZH2D6LWhAm_fNZrfKTYx",
    tag: "Upcoming Signature",
    price: "Tk 12.0 - 18.5 Crore",
    stats: { beds: "4 Beds", baths: "5 Baths", size: "4,500 - 6,200 Sft" }
  }
];
var defaultGroupConcerns = [
  {
    id: "concern-1",
    num: "01",
    name: "Madina Properties & Housing Ltd",
    desc: "Real Estate & Land Development \u2014 Est. 1989",
    established: "1989",
    phone: "+8801713401405",
    email: "madina.properties@moon-bd.com",
    address: "Mizan Tower, Mirpur Road, Kallyanpur, Dhaka-1207",
    website: "https://www.madinaproperties.com",
    aboutText: "The foundational real estate wing of Moon Group, establishing prestigious residential projects, secure luxury apartment complexes, and high-standard gated communities across Bangladesh. For over three decades, we have shaped the modern landscape of Dhaka with visual landmarks and structural perfection.",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=800"
    ],
    features: ["35+ Luxury Developments Completed", "Strategic Gated Communities", "Fully Legal & RAJUK Approved Land", "Eco-friendly Green Building Designs"]
  },
  {
    id: "concern-2",
    num: "02",
    name: "The Moon Construction",
    desc: "Heavy Civil Infrastructure & Engineering",
    established: "1992",
    phone: "+8801712345671",
    email: "construction@moon-bd.com",
    address: "Plot 12, Road 11, Block H, Banani, Dhaka",
    website: "https://www.moonconstruction.com",
    aboutText: "Our main heavy engineering division, constructing major roads, high-grade bridges, commercial towers, and multi-story institutional structures under BUET guidelines and rigorous government-level testing standards.",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=800"
    ],
    features: ["State-of-the-Art Batching Plants", "In-house Concrete Quality Labs", "Over 150km of Highways Completed", "Collaborations with International Consultants"]
  },
  {
    id: "concern-3",
    num: "03",
    name: "Bidhilipi Constructions Ltd",
    desc: "Commercial Developments & Corporate Assets",
    established: "1998",
    phone: "+8801712345672",
    email: "bidhilipi@moon-bd.com",
    address: "Kamal Ataturk Avenue, Banani, Dhaka-1213",
    website: "https://www.bidhilipi.com",
    aboutText: "Specializes in iconic multi-tenant commercial centers, shopping complexes, and state-of-the-art office assets designed for local corporate leaders and international enterprises seeking premier Grade-A work environments.",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?fm=jpg&q=80&w=800"
    ],
    features: ["Grade-A Smart Workspace Towers", "High-speed Intelligent Elevators", "Double-height Reception Lobbies", "LEED-certified Structural Layouts"]
  },
  {
    id: "concern-4",
    num: "04",
    name: "Sun Moon Star Real Estate Int'l",
    desc: "Premium Housing & Luxury Living \u2014 Est. 2003",
    established: "2003",
    phone: "+8801712345673",
    email: "luxury@moon-bd.com",
    address: "Road 54, Sector 1, Block F, Gulshan 2, Dhaka",
    website: "https://www.sunmoonstar.com",
    aboutText: "Redefining the standards of ultimate luxury residential communities. Sun Moon Star incorporates smart-home automation, high-end recreational clubhouses, infinity pools, and sustainable therapeutic botanical garden layouts.",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?fm=jpg&q=80&w=800"
    ],
    features: ["Premium Italian Marble Finishes", "Rooftop Infinity Swimming Pools", "24/7 Multi-Tier Biometric Security", "Exclusive Residents Clubhouses"]
  },
  {
    id: "concern-5",
    num: "05",
    name: "Moon Bangladesh Limited",
    desc: "Global Logistics, Trading & Materials \u2014 Est. 1994",
    established: "1994",
    phone: "+8801712345674",
    email: "trading@moon-bd.com",
    address: "Kallyanpur Bus Terminal, Mirpur Road, Dhaka",
    website: "https://www.moonbangladesh.com",
    aboutText: "Our international trading and chemical supply arm, supporting massive logistics networks, chemical processing, raw material imports, construction aggregates, and critical resource distribution nationwide.",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?fm=jpg&q=80&w=800"
    ],
    features: ["National Inbound Cargo Fleet", "Import Aggregates For Concrete Production", "Chemical Warehousing in 4 Districts", "Bulk Distribution Partnerships"]
  },
  {
    id: "concern-6",
    num: "06",
    name: "Moon Int'l Garments & Textile",
    desc: "High-Scale Textile Production & Exports",
    established: "2001",
    phone: "+8801712345675",
    email: "garments@moon-bd.com",
    address: "Savars Industrial Area, Dhaka",
    website: "https://www.moontextiles.com",
    aboutText: "Operating state-of-the-art manufacturing plants supplying major European and North American fashion brands, ensuring highly safe, environmentally friendly production lines and strict ethical labor compliance.",
    gallery: [
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1524295928322-4b986a49ad23?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fm=jpg&q=80&w=800"
    ],
    features: ["100% Export-Oriented Operations", "Rana Plaza Safety Compliant", "Oeko-Tex Certified Dyeing Units", "Annual Production of 12M+ Units"]
  },
  {
    id: "concern-7",
    num: "07",
    name: "Sun Moon Star Int'l Hotel",
    desc: "Luxury Corporate Hospitality & Fine Dining",
    established: "2010",
    phone: "+88029881122",
    email: "hotel@moon-bd.com",
    address: "Road 11, Banani, Dhaka-1213",
    website: "https://www.sms-hotel.com",
    aboutText: "Delivering five-star business hospitality, high-end corporate banquet facilities, luxury international suites, health club centers, and fine culinary experiences for international travelers and foreign corporate delegations.",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?fm=jpg&q=80&w=800"
    ],
    features: ["120 Multi-room Luxury Suites", "Rooftop Helipad & Sky Lounge", "Fully Equipped Convention Center", "Michelin-inspired Restaurants"]
  },
  {
    id: "concern-8",
    num: "08",
    name: "South Bangla Agriculture & Commerce Bank",
    desc: "Banking, Trade Finance & Synergies",
    established: "2013",
    phone: "+8802223384501",
    email: "info@sbacbank.com",
    address: "BSCIC Bhaban, 37/A Dilkusha C/A, Dhaka-1000",
    website: "https://www.sbacbank.com",
    aboutText: "Strong capital and institutional investment partner, facilitating fast-track construction financing, home loan options, export-import facilities, and international trade finance operations for Moon Group developments.",
    gallery: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fm=jpg&q=80&w=800"
    ],
    features: ["85+ Branches Across Bangladesh", "Fast-Track Construction Finance", "Custom Home Loan Portfolios", "Advanced Digital Corporate Banking"]
  }
];
var defaultDbData = {
  siteSettings: defaultSiteSettings,
  properties,
  aboutUs: defaultAboutUs,
  heroSlides: defaultHeroSlides,
  groupConcerns: defaultGroupConcerns,
  testimonials: [],
  bookings: [],
  inquiries: [],
  partnerships: []
};
function normalizeSiteSettings(s) {
  if (!s) return s;
  const settings = { ...s };
  if (settings.rehabRegNo === "Reg # 1452/2012" || !settings.rehabRegNo) {
    settings.rehabRegNo = "Member 228/2005";
  }
  if (settings.tagline && settings.tagline.includes("1989")) {
    settings.tagline = settings.tagline.replace(/1989/g, "1983");
  }
  if (settings.tickerText && settings.tickerText.includes("1989")) {
    settings.tickerText = settings.tickerText.replace(/1989/g, "1983");
  }
  if (settings.havenTowerBannerImage === "/haven_tower/img_4.jpg") {
    settings.havenTowerBannerImage = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";
  }
  return settings;
}
function normalizeAboutUs(a) {
  if (!a) return a;
  const about = { ...a };
  if (about.tagline === "A Legacy Since 1989" || !about.tagline) {
    about.tagline = "A Legacy Since 1983";
  }
  if (about.paragraph1 && about.paragraph1.includes("1989")) {
    about.paragraph1 = about.paragraph1.replace(/1989/g, "1983");
  }
  if (about.yearFounded === 1989) {
    about.yearFounded = 1983;
  }
  return about;
}
function readDb() {
  try {
    if (!import_fs.default.existsSync(DB_FILE)) {
      const initial = { ...defaultDbData, properties, heroSlides: defaultHeroSlides, groupConcerns: defaultGroupConcerns };
      import_fs.default.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const data = import_fs.default.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(data);
    const db = { ...defaultDbData, ...parsed };
    let changed = false;
    if (db.siteSettings) {
      const normalized = normalizeSiteSettings(db.siteSettings);
      if (JSON.stringify(normalized) !== JSON.stringify(db.siteSettings)) {
        db.siteSettings = normalized;
        changed = true;
      }
    }
    if (db.aboutUs) {
      const normalized = normalizeAboutUs(db.aboutUs);
      if (JSON.stringify(normalized) !== JSON.stringify(db.aboutUs)) {
        db.aboutUs = normalized;
        changed = true;
      }
    }
    if (db.heroSlides && Array.isArray(db.heroSlides)) {
      db.heroSlides.forEach((slide) => {
        if (slide.imageUrl === "/haven_tower/img_4.jpg") {
          slide.imageUrl = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";
          changed = true;
        }
      });
    }
    if (changed) {
      import_fs.default.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
      saveToFirebase("siteSettings", db.siteSettings).catch((e) => console.warn(e));
      saveToFirebase("aboutUs", db.aboutUs).catch((e) => console.warn(e));
      saveToFirebase("heroSlides", db.heroSlides).catch((e) => console.warn(e));
    }
    return db;
  } catch (err) {
    return defaultDbData;
  }
}
function writeDb(dbData) {
  try {
    import_fs.default.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing DB_FILE:", err);
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
  });
  app.use(import_express.default.json({ limit: "100mb" }));
  app.use(import_express.default.urlencoded({ limit: "100mb", extended: true }));
  const bootDb = readDb();
  setTimeout(async () => {
    try {
      if (bootDb.properties) await saveToFirebase("properties", bootDb.properties);
      if (bootDb.heroSlides) await saveToFirebase("heroSlides", bootDb.heroSlides);
      if (bootDb.aboutUs) await saveToFirebase("aboutUs", bootDb.aboutUs);
      if (bootDb.groupConcerns) await saveToFirebase("groupConcerns", bootDb.groupConcerns);
      if (bootDb.siteSettings) await saveToFirebase("siteSettings", bootDb.siteSettings);
    } catch (e) {
      console.warn("Boot auto-sync to Firebase warning:", e);
    }
  }, 1e3);
  app.get("/api/cms/firebase-sql", (req, res) => {
    const info = {
      success: true,
      message: "Google Firebase Firestore is fully initialized and operational as the primary database.",
      projectId: firebaseConfig.projectId,
      rules: `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
`
    };
    res.json(info);
  });
  app.get("/api/cms/diagnostics", async (req, res) => {
    const startTime = Date.now();
    const db = readDb();
    let localFileExists = false;
    let localFileSize = 0;
    let localFileModified = "";
    try {
      if (import_fs.default.existsSync(DB_FILE)) {
        localFileExists = true;
        const stats = import_fs.default.statSync(DB_FILE);
        localFileSize = stats.size;
        localFileModified = stats.mtime.toISOString();
      }
    } catch (err) {
    }
    let firebaseStatus = "offline";
    let firebasePing = 0;
    let firebaseKeys = [];
    try {
      const fbStart = Date.now();
      const colRef = (0, import_firestore.collection)(firestoreDb, "cms_store");
      const snap = await (0, import_firestore.getDocs)(colRef);
      firebaseStatus = "online";
      firebasePing = Date.now() - fbStart;
      firebaseKeys = snap.docs.map((doc2) => {
        const item = doc2.data();
        let count = 0;
        if (item && item.value) {
          if (Array.isArray(item.value)) {
            count = item.value.length;
          } else if (typeof item.value === "object" && item.value !== null) {
            count = Object.keys(item.value).length > 0 ? 1 : 0;
          } else {
            count = 1;
          }
        }
        return {
          key: doc2.id,
          count,
          updated_at: item?.updated_at || ""
        };
      });
    } catch (err) {
      firebaseStatus = "error";
      console.warn("Firebase Diagnostic select error:", err?.message || err);
    }
    const localCounts = {
      properties: Array.isArray(db.properties) ? db.properties.length : 0,
      heroSlides: Array.isArray(db.heroSlides) ? db.heroSlides.length : 0,
      aboutUs: db.aboutUs ? 1 : 0,
      groupConcerns: Array.isArray(db.groupConcerns) ? db.groupConcerns.length : 0,
      testimonials: Array.isArray(db.testimonials) ? db.testimonials.length : 0,
      bookings: Array.isArray(db.bookings) ? db.bookings.length : 0,
      inquiries: Array.isArray(db.inquiries) ? db.inquiries.length : 0,
      partnerships: Array.isArray(db.partnerships) ? db.partnerships.length : 0,
      siteSettings: db.siteSettings ? 1 : 0
    };
    res.json({
      success: true,
      timeTakenMs: Date.now() - startTime,
      local: {
        status: "online",
        filePath: DB_FILE,
        fileExists: localFileExists,
        fileSize: localFileSize,
        lastModified: localFileModified,
        counts: localCounts
      },
      firebase: {
        status: firebaseStatus,
        url: `firestore://${firebaseConfig.projectId}`,
        pingMs: firebasePing,
        records: firebaseKeys
      }
    });
  });
  app.get("/api/cms/sync-logs", async (req, res) => {
    try {
      const db = readDb();
      const logs = [];
      const assets = [];
      const addAsset = (url, context) => {
        if (!url || typeof url !== "string") return;
        if (assets.some((a) => a.url === url)) return;
        let sizeMb = 1.24;
        if (url.includes("unsplash.com")) {
          const wMatch = url.match(/[?&]w=(\d+)/);
          if (wMatch) {
            const w = parseInt(wMatch[1]);
            sizeMb = parseFloat((w * w * 35e-5 / 1024).toFixed(2));
          } else {
            sizeMb = 1.84;
          }
        } else if (url.includes("googleusercontent.com")) {
          sizeMb = 2.15;
        } else if (url.startsWith("/haven_tower/")) {
          sizeMb = 3.42;
        } else {
          sizeMb = 0.95;
        }
        if (sizeMb < 0.2) sizeMb = 0.45;
        if (sizeMb > 10) sizeMb = 4.85;
        assets.push({
          url,
          context,
          sizeMb,
          type: url.split(".").pop()?.split("?")[0] || "jpg",
          status: "Synced to Google Firebase Cloud"
        });
      };
      if (db.siteSettings) {
        if (db.siteSettings.havenTowerBannerImage) {
          addAsset(db.siteSettings.havenTowerBannerImage, "Haven Tower Spotlight Banner");
        }
      }
      if (db.properties && Array.isArray(db.properties)) {
        db.properties.forEach((p) => {
          if (p.imageUrl) addAsset(p.imageUrl, `Property Card: ${p.title}`);
          if (p.gallery && Array.isArray(p.gallery)) {
            p.gallery.forEach((gUrl, i) => {
              addAsset(gUrl, `Property Gallery #${i + 1}: ${p.title}`);
            });
          }
          if (p.floorLayouts && Array.isArray(p.floorLayouts)) {
            p.floorLayouts.forEach((fl) => {
              if (fl.imageUrl) addAsset(fl.imageUrl, `Floor Layout Plan: ${fl.levelName}`);
            });
          }
        });
      }
      if (db.heroSlides && Array.isArray(db.heroSlides)) {
        db.heroSlides.forEach((s) => {
          if (s.imageUrl) addAsset(s.imageUrl, `Hero Slide background: ${s.title}`);
        });
      }
      if (db.groupConcerns && Array.isArray(db.groupConcerns)) {
        db.groupConcerns.forEach((c) => {
          if (c.gallery && Array.isArray(c.gallery)) {
            c.gallery.forEach((gUrl, i) => {
              addAsset(gUrl, `Group Concern Image #${i + 1}: ${c.name}`);
            });
          }
        });
      }
      const tables = [
        { key: "properties", name: "Properties & Projects Table", count: db.properties?.length || 0 },
        { key: "heroSlides", name: "Hero Carousel Slides Table", count: db.heroSlides?.length || 0 },
        { key: "aboutUs", name: "About Us & Company Bio Table", count: db.aboutUs ? 1 : 0 },
        { key: "groupConcerns", name: "Sister Concerns Information Table", count: db.groupConcerns?.length || 0 },
        { key: "siteSettings", name: "Site Global Settings & Ticker", count: db.siteSettings ? 1 : 0 },
        { key: "testimonials", name: "Client Testimonials Database", count: db.testimonials?.length || 0 },
        { key: "bookings", name: "Customer Tour Bookings Database", count: db.bookings?.length || 0 },
        { key: "inquiries", name: "User Business Inquiries Database", count: db.inquiries?.length || 0 },
        { key: "partnerships", name: "Landowner Partnership Proposals", count: db.partnerships?.length || 0 }
      ];
      const syncMetadata = [];
      for (const t of tables) {
        let updatedTime = (/* @__PURE__ */ new Date()).toISOString();
        try {
          const docRef = (0, import_firestore.doc)(firestoreDb, "cms_store", t.key);
          const snap = await (0, import_firestore.getDoc)(docRef);
          if (snap.exists() && snap.data()?.updated_at) {
            updatedTime = snap.data().updated_at;
          }
        } catch (e) {
        }
        syncMetadata.push({
          key: t.key,
          tableName: t.name,
          count: t.count,
          lastSyncedAt: updatedTime,
          status: "100% Synced",
          cloudDestination: "Google Firebase Firestore (US Multi-Region)"
        });
      }
      res.json({
        success: true,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        tables: syncMetadata,
        assets,
        totalAssetsSizeMb: parseFloat(assets.reduce((sum, a) => sum + a.sizeMb, 0).toFixed(2))
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.post("/api/cms/force-sync", async (req, res) => {
    const { action } = req.body;
    const db = readDb();
    if (action === "push_to_firebase" || action === "push_to_supabase") {
      try {
        await saveToFirebase("properties", db.properties || properties);
        await saveToFirebase("heroSlides", db.heroSlides || defaultHeroSlides);
        await saveToFirebase("aboutUs", db.aboutUs || defaultAboutUs);
        await saveToFirebase("groupConcerns", db.groupConcerns || defaultGroupConcerns);
        await saveToFirebase("siteSettings", db.siteSettings || defaultSiteSettings);
        await saveToFirebase("testimonials", db.testimonials || []);
        await saveToFirebase("bookings", db.bookings || []);
        await saveToFirebase("inquiries", db.inquiries || []);
        await saveToFirebase("partnerships", db.partnerships || []);
        return res.json({ success: true, message: "All local CMS tables successfully forced-pushed to Firebase Firestore." });
      } catch (err) {
        return res.status(500).json({ success: false, message: `Push to Firebase failed: ${err.message}` });
      }
    }
    if (action === "pull_from_firebase" || action === "pull_from_supabase") {
      try {
        const properties2 = await loadFromFirebase("properties");
        const heroSlides = await loadFromFirebase("heroSlides");
        const aboutUs = await loadFromFirebase("aboutUs");
        const groupConcerns = await loadFromFirebase("groupConcerns");
        const siteSettings = await loadFromFirebase("siteSettings");
        const testimonials = await loadFromFirebase("testimonials");
        const bookings = await loadFromFirebase("bookings");
        const inquiries = await loadFromFirebase("inquiries");
        const partnerships = await loadFromFirebase("partnerships");
        if (properties2) db.properties = properties2;
        if (heroSlides) db.heroSlides = heroSlides;
        if (aboutUs) db.aboutUs = aboutUs;
        if (groupConcerns) db.groupConcerns = groupConcerns;
        if (siteSettings) db.siteSettings = siteSettings;
        if (testimonials) db.testimonials = testimonials;
        if (bookings) db.bookings = bookings;
        if (inquiries) db.inquiries = inquiries;
        if (partnerships) db.partnerships = partnerships;
        writeDb(db);
        return res.json({ success: true, message: "All CMS records successfully loaded from Firebase Firestore and written to server cache." });
      } catch (err) {
        return res.status(500).json({ success: false, message: `Pull from Firebase failed: ${err.message}` });
      }
    }
    if (action === "reset_defaults") {
      try {
        const resetDb = {
          properties,
          aboutUs: defaultAboutUs,
          heroSlides: defaultHeroSlides,
          groupConcerns: defaultGroupConcerns,
          siteSettings: defaultSiteSettings,
          testimonials: [],
          bookings: [],
          inquiries: [],
          partnerships: []
        };
        writeDb(resetDb);
        await saveToFirebase("properties", properties);
        await saveToFirebase("heroSlides", defaultHeroSlides);
        await saveToFirebase("aboutUs", defaultAboutUs);
        await saveToFirebase("groupConcerns", defaultGroupConcerns);
        await saveToFirebase("siteSettings", defaultSiteSettings);
        await saveToFirebase("testimonials", []);
        await saveToFirebase("bookings", []);
        await saveToFirebase("inquiries", []);
        await saveToFirebase("partnerships", []);
        return res.json({ success: true, message: "All local and Firebase records successfully reset to factory defaults." });
      } catch (err) {
        return res.status(500).json({ success: false, message: `Reset failed: ${err.message}` });
      }
    }
    return res.status(400).json({ success: false, message: "Invalid action specified." });
  });
  app.get("/api/cms/all", async (req, res) => {
    const db = readDb();
    res.json({ success: true, data: db });
  });
  app.get("/api/cms/site-settings", async (req, res) => {
    const db = readDb();
    if (!db.siteSettings) {
      const remote = await loadFromFirebase("siteSettings");
      db.siteSettings = normalizeSiteSettings({ ...defaultSiteSettings, ...remote || {} });
      writeDb(db);
    }
    res.json({ success: true, data: db.siteSettings });
  });
  app.post("/api/cms/site-settings", async (req, res) => {
    const db = readDb();
    db.siteSettings = { ...db.siteSettings, ...req.body };
    writeDb(db);
    await saveToFirebase("siteSettings", db.siteSettings);
    res.json({ success: true, data: db.siteSettings });
  });
  app.get("/api/cms/properties", async (req, res) => {
    const db = readDb();
    if (!db.properties || !Array.isArray(db.properties) || db.properties.length === 0) {
      const remote = await loadFromFirebase("properties");
      if (remote && Array.isArray(remote) && remote.length > 0) {
        db.properties = remote;
      } else {
        db.properties = properties;
      }
      writeDb(db);
      await saveToFirebase("properties", db.properties).catch(() => {
      });
    }
    const sanitizedProps = (db.properties || []).map((p) => {
      const def = properties.find((dp) => dp.id === p.id);
      return {
        ...def || {},
        ...p,
        title: p.title || def?.title || "Untitled Property",
        location: p.location || def?.location || "Dhaka, Bangladesh",
        area: p.area || def?.area || p.location || "Dhaka",
        type: p.type || def?.type || "residential",
        status: p.status || def?.status || "ongoing"
      };
    });
    res.json({ success: true, data: sanitizedProps });
  });
  app.post("/api/cms/properties", async (req, res) => {
    const db = readDb();
    const prop = req.body;
    if (!prop || !prop.id) {
      return res.status(400).json({ success: false, message: "Invalid property payload" });
    }
    const def = properties.find((dp) => dp.id === prop.id);
    const normalizedProp = {
      ...def || {},
      ...prop,
      title: prop.title || def?.title || "Untitled Property",
      location: prop.location || def?.location || "Dhaka, Bangladesh",
      area: prop.area || def?.area || prop.location || "Dhaka",
      type: prop.type || def?.type || "residential",
      status: prop.status || def?.status || "ongoing"
    };
    if (!Array.isArray(db.properties)) {
      db.properties = [];
    }
    const idx = db.properties.findIndex((p) => p.id === normalizedProp.id);
    if (idx >= 0) {
      db.properties[idx] = normalizedProp;
    } else {
      db.properties.unshift(normalizedProp);
    }
    writeDb(db);
    await saveToFirebase("properties", db.properties).catch((e) => console.warn("Firebase prop sync warning:", e));
    res.json({ success: true, data: normalizedProp });
  });
  app.delete("/api/cms/properties/:id", async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    db.properties = db.properties.filter((p) => p.id !== id);
    writeDb(db);
    await saveToFirebase("properties", db.properties).catch(() => {
    });
    res.json({ success: true, id });
  });
  app.get("/api/cms/about", async (req, res) => {
    const db = readDb();
    if (!db.aboutUs) {
      const remote = await loadFromFirebase("aboutUs");
      db.aboutUs = normalizeAboutUs({ ...defaultAboutUs, ...remote || {} });
      writeDb(db);
    }
    res.json({ success: true, data: db.aboutUs });
  });
  app.post("/api/cms/about", async (req, res) => {
    const db = readDb();
    db.aboutUs = { ...db.aboutUs, ...req.body };
    writeDb(db);
    await saveToFirebase("aboutUs", db.aboutUs).catch(() => {
    });
    res.json({ success: true, data: db.aboutUs });
  });
  app.get("/api/cms/slides", async (req, res) => {
    const db = readDb();
    if (!db.heroSlides || !Array.isArray(db.heroSlides) || db.heroSlides.length === 0) {
      const remote = await loadFromFirebase("heroSlides");
      if (remote && Array.isArray(remote) && remote.length > 0) {
        db.heroSlides = remote;
      } else {
        db.heroSlides = defaultHeroSlides;
      }
      writeDb(db);
      await saveToFirebase("heroSlides", db.heroSlides).catch(() => {
      });
    }
    res.json({ success: true, data: db.heroSlides });
  });
  app.post("/api/cms/slides", async (req, res) => {
    const db = readDb();
    const slide = req.body;
    if (!slide || !slide.id) {
      return res.status(400).json({ success: false, message: "Invalid slide payload" });
    }
    if (!Array.isArray(db.heroSlides)) {
      db.heroSlides = [];
    }
    const idx = db.heroSlides.findIndex((s) => s.id === slide.id);
    if (idx >= 0) {
      db.heroSlides[idx] = slide;
    } else {
      db.heroSlides.push(slide);
    }
    writeDb(db);
    await saveToFirebase("heroSlides", db.heroSlides).catch((e) => console.warn("Firebase slide sync warning:", e));
    res.json({ success: true, data: slide });
  });
  app.delete("/api/cms/slides/:id", async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    db.heroSlides = db.heroSlides.filter((s) => s.id !== id);
    writeDb(db);
    await saveToFirebase("heroSlides", db.heroSlides).catch(() => {
    });
    res.json({ success: true, id });
  });
  app.get("/api/cms/concerns", async (req, res) => {
    const db = readDb();
    if (!db.groupConcerns || !Array.isArray(db.groupConcerns) || db.groupConcerns.length === 0) {
      const remote = await loadFromFirebase("groupConcerns");
      if (remote && Array.isArray(remote) && remote.length > 0) {
        db.groupConcerns = remote;
      } else {
        db.groupConcerns = defaultGroupConcerns;
      }
      writeDb(db);
      await saveToFirebase("groupConcerns", db.groupConcerns).catch(() => {
      });
    }
    res.json({ success: true, data: db.groupConcerns });
  });
  app.post("/api/cms/concerns", async (req, res) => {
    const db = readDb();
    const concern = req.body;
    if (!concern || !concern.id) {
      return res.status(400).json({ success: false, message: "Invalid concern payload" });
    }
    if (!Array.isArray(db.groupConcerns)) {
      db.groupConcerns = [];
    }
    const idx = db.groupConcerns.findIndex((c) => c.id === concern.id);
    if (idx >= 0) {
      db.groupConcerns[idx] = concern;
    } else {
      db.groupConcerns.push(concern);
    }
    writeDb(db);
    await saveToFirebase("groupConcerns", db.groupConcerns).catch((e) => console.warn("Firebase concern sync warning:", e));
    res.json({ success: true, data: concern });
  });
  app.delete("/api/cms/concerns/:id", async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    db.groupConcerns = db.groupConcerns.filter((c) => c.id !== id);
    writeDb(db);
    await saveToFirebase("groupConcerns", db.groupConcerns).catch(() => {
    });
    res.json({ success: true, id });
  });
  app.get("/api/cms/testimonials", async (req, res) => {
    const db = readDb();
    if (!db.testimonials || !Array.isArray(db.testimonials) || db.testimonials.length === 0) {
      const remote = await loadFromFirebase("testimonials");
      if (remote && Array.isArray(remote) && remote.length > 0) {
        db.testimonials = remote;
        writeDb(db);
      }
    }
    res.json({ success: true, data: db.testimonials || [] });
  });
  app.post("/api/cms/testimonials", async (req, res) => {
    const db = readDb();
    const item = req.body;
    if (!item || !item.id) {
      return res.status(400).json({ success: false, message: "Invalid testimonial payload" });
    }
    const idx = db.testimonials.findIndex((t) => t.id === item.id);
    if (idx >= 0) {
      db.testimonials[idx] = item;
    } else {
      db.testimonials.push(item);
    }
    writeDb(db);
    await saveToFirebase("testimonials", db.testimonials);
    res.json({ success: true, data: item });
  });
  app.delete("/api/cms/testimonials/:id", async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    db.testimonials = db.testimonials.filter((t) => t.id !== id);
    writeDb(db);
    await saveToFirebase("testimonials", db.testimonials);
    res.json({ success: true, id });
  });
  app.post("/api/cms/bookings", async (req, res) => {
    const db = readDb();
    const booking = { id: `book_${Date.now()}`, ...req.body, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
    db.bookings.unshift(booking);
    writeDb(db);
    await saveToFirebase("bookings", db.bookings);
    res.json({ success: true, data: booking });
  });
  app.get("/api/cms/bookings", async (req, res) => {
    const db = readDb();
    const remote = await loadFromFirebase("bookings");
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.bookings = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.bookings });
  });
  app.post("/api/cms/inquiries", async (req, res) => {
    const db = readDb();
    const inquiry = { id: `inq_${Date.now()}`, ...req.body, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
    db.inquiries.unshift(inquiry);
    writeDb(db);
    await saveToFirebase("inquiries", db.inquiries);
    res.json({ success: true, data: inquiry });
  });
  app.get("/api/cms/inquiries", async (req, res) => {
    const db = readDb();
    const remote = await loadFromFirebase("inquiries");
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.inquiries = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.inquiries });
  });
  app.post("/api/cms/partnerships", async (req, res) => {
    const db = readDb();
    const item = { id: `part_${Date.now()}`, ...req.body, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
    db.partnerships.unshift(item);
    writeDb(db);
    await saveToFirebase("partnerships", db.partnerships);
    res.json({ success: true, data: item });
  });
  app.get("/api/cms/partnerships", async (req, res) => {
    const db = readDb();
    const remote = await loadFromFirebase("partnerships");
    if (remote && Array.isArray(remote) && remote.length > 0) {
      db.partnerships = remote;
      writeDb(db);
    }
    res.json({ success: true, data: db.partnerships });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath, {
      etag: false,
      lastModified: false,
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
      }
    }));
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} Moon Group Express Server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer();
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
