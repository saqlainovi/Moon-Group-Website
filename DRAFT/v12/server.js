/**
 * Express Backend Server for Moon Group Website
 * Self-hosted database & API endpoints to bypass Firebase daily quota limits completely.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'server_db.json');

// Body parser with 50MB limit to handle high-resolution image uploads & Base64
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static frontend files from 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Helper to read database
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return null;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading server_db.json:', err);
    return null;
  }
}

// Helper to write database safely
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing server_db.json:', err);
    return false;
  }
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET all CMS collections
app.get('/api/all', (req, res) => {
  const db = readDB();
  res.json(db || {});
});

// GET Properties
app.get('/api/properties', (req, res) => {
  const db = readDB();
  res.json(db?.properties || []);
});

// POST Save/Update Property
app.post('/api/properties', (req, res) => {
  const db = readDB() || { properties: [] };
  const property = req.body;
  if (!property || !property.id) {
    return res.status(400).json({ error: 'Invalid property data' });
  }

  if (!db.properties) db.properties = [];
  const index = db.properties.findIndex(p => p.id === property.id);
  if (index >= 0) {
    db.properties[index] = property;
  } else {
    db.properties.unshift(property);
  }

  writeDB(db);
  res.json({ success: true, property });
});

// DELETE Property
app.delete('/api/properties/:id', (req, res) => {
  const db = readDB();
  if (db && db.properties) {
    db.properties = db.properties.filter(p => p.id !== req.params.id);
    writeDB(db);
  }
  res.json({ success: true });
});

// GET Site Settings
app.get('/api/site_settings', (req, res) => {
  const db = readDB();
  res.json(db?.site_settings || null);
});

// POST Site Settings
app.post('/api/site_settings', (req, res) => {
  const db = readDB() || {};
  db.site_settings = req.body;
  writeDB(db);
  res.json({ success: true, site_settings: db.site_settings });
});

// GET About Us
app.get('/api/about_us', (req, res) => {
  const db = readDB();
  res.json(db?.about_us || null);
});

// POST About Us
app.post('/api/about_us', (req, res) => {
  const db = readDB() || {};
  db.about_us = req.body;
  writeDB(db);
  res.json({ success: true, about_us: db.about_us });
});

// GET Hero Slides
app.get('/api/hero_slides', (req, res) => {
  const db = readDB();
  res.json(db?.hero_slides || []);
});

// POST Hero Slide
app.post('/api/hero_slides', (req, res) => {
  const db = readDB() || { hero_slides: [] };
  const slide = req.body;
  if (!slide || !slide.id) return res.status(400).json({ error: 'Invalid slide' });
  if (!db.hero_slides) db.hero_slides = [];
  const index = db.hero_slides.findIndex(s => s.id === slide.id);
  if (index >= 0) db.hero_slides[index] = slide;
  else db.hero_slides.unshift(slide);
  writeDB(db);
  res.json({ success: true, slide });
});

// DELETE Hero Slide
app.delete('/api/hero_slides/:id', (req, res) => {
  const db = readDB();
  if (db && db.hero_slides) {
    db.hero_slides = db.hero_slides.filter(s => s.id !== req.params.id);
    writeDB(db);
  }
  res.json({ success: true });
});

// GET Group Concerns
app.get('/api/group_concerns', (req, res) => {
  const db = readDB();
  res.json(db?.group_concerns || []);
});

// POST Group Concern
app.post('/api/group_concerns', (req, res) => {
  const db = readDB() || { group_concerns: [] };
  const concern = req.body;
  if (!db.group_concerns) db.group_concerns = [];
  const index = db.group_concerns.findIndex(c => c.id === concern.id);
  if (index >= 0) db.group_concerns[index] = concern;
  else db.group_concerns.unshift(concern);
  writeDB(db);
  res.json({ success: true, concern });
});

// DELETE Group Concern
app.delete('/api/group_concerns/:id', (req, res) => {
  const db = readDB();
  if (db && db.group_concerns) {
    db.group_concerns = db.group_concerns.filter(c => c.id !== req.params.id);
    writeDB(db);
  }
  res.json({ success: true });
});

// GET Testimonials
app.get('/api/testimonials', (req, res) => {
  const db = readDB();
  res.json(db?.testimonials || []);
});

// POST Testimonial
app.post('/api/testimonials', (req, res) => {
  const db = readDB() || { testimonials: [] };
  const t = req.body;
  if (!db.testimonials) db.testimonials = [];
  const index = db.testimonials.findIndex(item => item.id === t.id);
  if (index >= 0) db.testimonials[index] = t;
  else db.testimonials.unshift(t);
  writeDB(db);
  res.json({ success: true, testimonial: t });
});

// DELETE Testimonial
app.delete('/api/testimonials/:id', (req, res) => {
  const db = readDB();
  if (db && db.testimonials) {
    db.testimonials = db.testimonials.filter(t => t.id !== req.params.id);
    writeDB(db);
  }
  res.json({ success: true });
});

// GET Bookings
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json(db?.bookings || []);
});

// POST Booking
app.post('/api/bookings', (req, res) => {
  const db = readDB() || { bookings: [] };
  if (!db.bookings) db.bookings = [];
  db.bookings.unshift(req.body);
  writeDB(db);
  res.json({ success: true });
});

// GET Partnerships
app.get('/api/partnerships', (req, res) => {
  const db = readDB();
  res.json(db?.partnerships || []);
});

// POST Partnership
app.post('/api/partnerships', (req, res) => {
  const db = readDB() || { partnerships: [] };
  if (!db.partnerships) db.partnerships = [];
  db.partnerships.unshift(req.body);
  writeDB(db);
  res.json({ success: true });
});

// SPA Routing Fallback for Single Page App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Moon Group Express Server running on port ${PORT}`);
});
