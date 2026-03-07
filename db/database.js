const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Define schemas
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            photo TEXT,
            password TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS listings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            location TEXT NOT NULL,
            image TEXT,
            price REAL,
            rating REAL,
            reviews INTEGER,
            badge TEXT,
            category TEXT,
            host TEXT,
            hostAbout TEXT,
            description TEXT,
            permit BOOLEAN,
            totalRooms INTEGER DEFAULT 5
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            listingId INTEGER,
            checkin TEXT,
            checkout TEXT,
            guests INTEGER,
            totalPrice REAL,
            hasGuide BOOLEAN,
            status TEXT DEFAULT 'Paid',
            dateCreated TEXT,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(listingId) REFERENCES listings(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS host_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            propertyName TEXT NOT NULL,
            propertyType TEXT NOT NULL,
            destination TEXT NOT NULL,
            address TEXT NOT NULL,
            rooms INTEGER NOT NULL,
            status TEXT DEFAULT 'pending',
            dateApplied TEXT DEFAULT (datetime('now', 'localtime'))
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            dateSubmitted TEXT DEFAULT (datetime('now', 'localtime'))
        )`);

        // Seed listings if empty
        db.get("SELECT COUNT(*) as count FROM listings", (err, row) => {
            if (row && row.count === 0) {
                const listings = [
                    ["Tea Garden Retreat", "Darjeeling", "images/dest1.jpg", 1200, 4.8, 124, "featured", "homestay", "Pemba Sherpa", "Local mountain guide since 2010.", "Experience peaceful stays amidst tea gardens.", 0],
                    ["Clouds End Cottage", "Gangtok", "images/dest2.jpg", 3500, 4.9, 87, "best choice", "homestay", "Karsang", "Passionate about local food.", "Modern comforts in the heart of mountains.", 1],
                    ["Alpine Birding Stay", "Pelling", "images/dest3.jpg", 2200, 4.7, 52, "", "resort", "Doma", "Birdwatching expert.", "A paradise for bird watchers.", 0]
                ];
                const stmt = db.prepare("INSERT INTO listings (title, location, image, price, rating, reviews, badge, category, host, hostAbout, description, permit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                listings.forEach(l => stmt.run(l));
                stmt.finalize();
                console.log("Database seeded with sample listings.");
            }
        });

        // Create a test user for easy login/testing
        db.run(`INSERT OR IGNORE INTO users (id, name, email, photo) VALUES (1, 'Tenzing Norgay', 'tenzing@gmail.com', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop')`);
    }
});

module.exports = db;
