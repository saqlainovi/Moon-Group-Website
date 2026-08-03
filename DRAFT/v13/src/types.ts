/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Amenity {
  icon: string;
  name: string;
}

export interface RoomSpecification {
  name: string;
  x: number; // grid percentage x
  y: number; // grid percentage y
  w: number; // grid percentage width
  h: number; // grid percentage height
  type: 'bed' | 'bath' | 'living' | 'kitchen' | 'balcony' | 'corridor';
}

export interface FloorLayout {
  levelName: string;
  sizeSqft: number;
  rooms: RoomSpecification[];
  imageUrl?: string;
}

export interface Property {
  id: string;
  title: string;
  type: 'residential' | 'commercial';
  status: 'ongoing' | 'upcoming' | 'completed';
  location: string;
  area: string;
  sizeRange: string;
  priceRange: string;
  beds?: number;
  baths?: number;
  imageUrl: string;
  imageFit?: "cover" | "contain" | "fill" | "scale-down";
  imagePosition?: string;
  gallery?: string[];
  description: string;
  features: string[];
  amenities: Amenity[];
  floorsCount: number;
  completionYear?: number;
  launchDate?: string;
  handoverDate?: string;
  floorLayouts: FloorLayout[];
  videoUrl?: string;
  address?: string;
  landArea?: string;
  aptPerFloor?: string;
  showVirtualConfigurator?: boolean;
  hideVirtualConfigurator?: boolean;
}

export interface VisitBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName: string;
  date: string;
  timeSlot: string;
  createdAt: string;
}

export interface LandownerPartnerSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  sizeKatha: number;
  roadWidthFt: number;
  frontageFt: number;
  facing: 'north' | 'south' | 'east' | 'west' | 'corner';
  additionalDetails: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
