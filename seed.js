const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'db', 'database.sqlite');
const db = new sqlite3.Database(dbPath);
const listings = [
    {
        id: 1,
        title: "Makaibari Tea Estate Bungalow",
        location: "Kurseong, Darjeeling",
        image: "images/hero-main.jpeg",
        price: 4500,
        rating: 4.9,
        reviews: 320,
        badge: "Heritage Stay",
        category: "homestay",
        host: "Mr. Banerjee",
        hostAbout: "The Banerjee family has been part of the Makaibari heritage for three generations.",
        description: "Experience the magic of the world's first organic tea garden.",
        permit: false
    },
    {
        id: 3,
        title: "Hidden Forest Retreat",
        location: "Gangtok, Sikkim",
        image: "images/67067778.jpg",
        price: 3500,
        rating: 4.8,
        reviews: 512,
        badge: "Eco Friendly",
        category: "homestay",
        host: "Keshav",
        hostAbout: "Keshav is an avid gardener.",
        description: "Nestled in a lush green valley just outside Gangtok.",
        permit: true
    },
    {
        id: 12,
        title: "Khonoma Heritage Stay",
        location: "Khonoma, Nagaland",
        image: "images/hero-3.jpeg",
        price: 3500,
        rating: 4.8,
        reviews: 92,
        badge: "Asia's 1st Green Village",
        category: "homestay",
        host: "Zovi",
        hostAbout: "Zovi is a local community leader.",
        description: "Stay in a traditional stone house.",
        permit: true
    },
    {
        id: 10,
        title: "Glenary's",
        location: "Darjeeling, West Bengal",
        image: "images/new-hero.jpeg",
        price: 800,
        rating: 4.6,
        reviews: 5000,
        badge: "Iconic",
        category: "restaurant",
        host: "Glen",
        hostAbout: "We serve the best cakes.",
        description: "The most famous bakery and restaurant in Darjeeling.",
        permit: false
    }
];

db.serialize(() => {
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

    // Clear old data
    db.run("DELETE FROM listings");

    // Insert new data
    const stmt = db.prepare(`INSERT INTO listings (id, title, location, image, price, rating, reviews, badge, category, host, hostAbout, description, permit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    for (const listing of listings) {
        stmt.run(
            listing.id,
            listing.title,
            listing.location,
            listing.image,
            listing.price,
            listing.rating,
            listing.reviews,
            listing.badge,
            listing.category,
            listing.host,
            listing.hostAbout,
            listing.description,
            listing.permit ? 1 : 0
        );
    }
    stmt.finalize();
    console.log("Database seeded with sample data.");
});

db.close();
