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
            photo TEXT
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
            permit BOOLEAN
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

        // Facilities and Gallery could be in separated tables, but for a simple site we can skip or store as JSON text in listings if needed.
    }
});

module.exports = db;
