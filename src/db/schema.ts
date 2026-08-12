import { pgTable, text, integer, boolean, doublePrecision, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const properties = pgTable('properties', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(),
  location: text('location').notNull(),
  price: text('price').notNull(),
  tag: text('tag'),
  bedrooms: text('bedrooms'),
  bathrooms: text('bathrooms'),
  sqft: text('sqft'),
  imageUrl: text('image_url').notNull(),
  gallery: jsonb('gallery'),
  description: text('description'),
  features: jsonb('features'),
  handoverDate: text('handover_date'),
  floorLayouts: jsonb('floor_layouts'),
  videoUrl: text('video_url'),
  virtualTourUrl: text('virtual_tour_url'),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
  createdAt: timestamp('created_at').defaultNow()
});

export const aboutUs = pgTable('about_us', {
  id: text('id').primaryKey(),
  tagline: text('tagline'),
  title: text('title'),
  paragraph1: text('paragraph1'),
  paragraph2: text('paragraph2'),
  imageUrl: text('image_url'),
  imageFit: text('image_fit'),
  imagePosition: text('image_position'),
  yearFounded: integer('year_founded'),
  sisterConcernsCount: integer('sister_concerns_count'),
  sectorsActiveCount: integer('sectors_active_count')
});

export const heroSlides = pgTable('hero_slides', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  imageFit: text('image_fit'),
  imagePosition: text('image_position'),
  tag: text('tag'),
  price: text('price'),
  stats: jsonb('stats')
});

export const groupConcerns = pgTable('group_concerns', {
  id: text('id').primaryKey(),
  num: text('num'),
  name: text('name').notNull(),
  desc: text('desc_text'),
  gallery: jsonb('gallery'),
  phone: text('phone'),
  email: text('email'),
  address: text('address'),
  website: text('website'),
  aboutText: text('about_text'),
  established: text('established'),
  features: jsonb('features')
});

export const testimonials = pgTable('testimonials', {
  id: text('id').primaryKey(),
  category: text('category'),
  image: text('image'),
  quote: text('quote'),
  author: text('author'),
  role: text('role'),
  project: text('project'),
  rating: integer('rating'),
  createdAt: text('created_at')
});

export const siteSettings = pgTable('site_settings', {
  id: text('id').primaryKey(),
  tickerText: text('ticker_text'),
  hotlinePhone: text('hotline_phone'),
  whatsappPhone: text('whatsapp_phone'),
  emailAddress: text('email_address'),
  headOffice: text('head_office'),
  facebookLink: text('facebook_link'),
  linkedinLink: text('linkedin_link'),
  twitterLink: text('twitter_link'),
  instagramLink: text('instagram_link'),
  youtubeLink: text('youtube_link'),
  brandName: text('brand_name'),
  tagline: text('tagline'),
  rehabRegNo: text('rehab_reg_no'),
  rajukCodeNo: text('rajuk_code_no'),
  telephoneNumbers: text('telephone_numbers'),
  copyrightText: text('copyright_text'),
  showVirtualConfigurator: boolean('show_virtual_configurator'),
  showHavenTowerBanner: boolean('show_haven_tower_banner'),
  havenTowerBannerImage: text('haven_tower_banner_image'),
  havenTowerTitle: text('haven_tower_title'),
  havenTowerDescription: text('haven_tower_description'),
  tickerSpeed: integer('ticker_speed')
});

export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(),
  propertyId: text('property_id'),
  propertyTitle: text('property_title'),
  fullName: text('full_name'),
  phone: text('phone'),
  email: text('email'),
  preferredDate: text('preferred_date'),
  preferredTime: text('preferred_time'),
  notes: text('notes'),
  createdAt: text('created_at'),
  status: text('status')
});

export const partnerships = pgTable('partnerships', {
  id: text('id').primaryKey(),
  type: text('type'),
  name: text('name'),
  phone: text('phone'),
  email: text('email'),
  location: text('location'),
  landSize: text('land_size'),
  notes: text('notes'),
  createdAt: text('created_at')
});

export const contactInquiries = pgTable('contact_inquiries', {
  id: text('id').primaryKey(),
  name: text('name'),
  phone: text('phone'),
  email: text('email'),
  subject: text('subject'),
  message: text('message'),
  createdAt: text('created_at')
});

export const nrbInquiries = pgTable('nrb_inquiries', {
  id: text('id').primaryKey(),
  name: text('name'),
  phone: text('phone'),
  email: text('email'),
  country: text('country'),
  propertyInterest: text('property_interest'),
  createdAt: text('created_at')
});

export const referrals = pgTable('referrals', {
  id: text('id').primaryKey(),
  referrerName: text('referrer_name'),
  referrerPhone: text('referrer_phone'),
  refereeName: text('referee_name'),
  refereePhone: text('referee_phone'),
  createdAt: text('created_at')
});
