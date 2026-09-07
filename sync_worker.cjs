const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const fbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebase-applet-config.json'), 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId || undefined);

function toMySQLDateTime(dateVal) {
  if (!dateVal) return new Date().toISOString().slice(0, 19).replace('T', ' ');
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

async function runSync() {
  console.log(`[${new Date().toISOString()}] Checking Firebase Firestore for new records...`);
  let mysqlConn = null;
  try {
    mysqlConn = await mysql.createConnection({
      host: process.env.MYSQL_HOST || '192.168.0.204',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'moon',
      password: process.env.MYSQL_PASSWORD || '@Oviovih400',
      database: process.env.MYSQL_DATABASE || 'moon_group'
    });

    // 1. Sync Bookings
    try {
      const snap = await getDocs(collection(db, 'bookings'));
      for (const d of snap.docs) {
        const b = d.data();
        const id = b.id || d.id;
        const createdAt = toMySQLDateTime(b.createdAt);
        await mysqlConn.execute(
          `INSERT INTO bookings (id, property_id, property_title, full_name, phone, email, preferred_date, preferred_time, notes, status, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE status = VALUES(status), property_title = VALUES(property_title);`,
          [
            id,
            b.propertyId || '',
            b.propertyName || b.propertyTitle || '',
            b.name || b.fullName || '',
            b.phone || '',
            b.email || '',
            b.date || b.preferredDate || '',
            b.timeSlot || b.preferredTime || '',
            b.notes || '',
            b.status || 'pending',
            createdAt
          ]
        );
      }
      console.log(` -> Bookings synced: ${snap.size}`);
    } catch (e) {
      console.warn('Booking sync note:', e.message);
    }

    // 2. Sync Inquiries
    try {
      const snap = await getDocs(collection(db, 'inquiries'));
      for (const d of snap.docs) {
        const inq = d.data();
        const id = inq.id || d.id;
        const createdAt = toMySQLDateTime(inq.createdAt);
        await mysqlConn.execute(
          `INSERT INTO inquiries (id, name, phone, email, subject, message, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE message = VALUES(message);`,
          [
            id,
            inq.name || '',
            inq.phone || '',
            inq.email || '',
            inq.subject || '',
            inq.message || '',
            createdAt
          ]
        );
      }
      console.log(` -> Inquiries synced: ${snap.size}`);
    } catch (e) {
      console.warn('Inquiry sync note:', e.message);
    }

    // 3. Sync Partnerships
    try {
      const snap = await getDocs(collection(db, 'partnerships'));
      for (const d of snap.docs) {
        const part = d.data();
        const id = part.id || d.id;
        const createdAt = toMySQLDateTime(part.createdAt);
        const landSize = part.landSize || (part.sizeKatha ? `${part.sizeKatha} Katha` : '');
        const notes = part.notes || part.additionalDetails || '';
        const type = part.type || 'Joint Venture Development';
        await mysqlConn.execute(
          `INSERT INTO partnerships (id, type, name, phone, email, location, land_size, notes, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE notes = VALUES(notes), location = VALUES(location);`,
          [
            id,
            type,
            part.name || '',
            part.phone || '',
            part.email || '',
            part.location || '',
            landSize,
            notes,
            createdAt
          ]
        );
      }
      console.log(` -> Partnerships synced: ${snap.size}`);
    } catch (e) {
      console.warn('Partnership sync note:', e.message);
    }

    console.log(`[${new Date().toISOString()}] Sync to MySQL finished successfully!`);
  } catch (err) {
    console.error('MySQL connection / sync error:', err.message);
  } finally {
    if (mysqlConn) await mysqlConn.end().catch(() => {});
  }
}

async function main() {
  const isOnce = process.argv.includes('--once');
  await runSync();

  if (isOnce) {
    process.exit(0);
  }

  // Continuous sync loop every 60 seconds
  console.log('Sync worker is running in continuous daemon mode (checks every 60s)...');
  setInterval(async () => {
    try {
      await runSync();
    } catch (err) {
      console.error('Interval sync error:', err.message);
    }
  }, 60000);
}

if (require.main === module) {
  main();
}

module.exports = { runSync };
