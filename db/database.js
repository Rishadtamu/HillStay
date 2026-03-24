const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Use serialize() to ensure tables are created sequentially
        db.serialize(() => {
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

            // Create test user (after tables exist)
            db.run(`INSERT OR IGNORE INTO users (id, name, email, photo) VALUES (1, 'Tenzing Norgay', 'tenzing@gmail.com', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop')`);

            // Seed listings if empty
            db.get("SELECT COUNT(*) as count FROM listings", (err, row) => {
                if (err) { console.error('Seed check error:', err.message); return; }
                if (row && row.count === 0) {
                    const listings = [
                        // Darjeeling
                        ["Makaibari Tea Bungalow", "Kurseong, Darjeeling", "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70", 4500, 4.9, 312, "Bestseller", "homestay", "Pemba Sherpa", "Expert tea planter and local guide since 2005.", "A stunning colonial bungalow surrounded by the world-famous Makaibari tea gardens. Wake up to mist-covered hills and enjoy freshly brewed first-flush Darjeeling tea.", 0, 6],
                        ["Mirik Lakeside Bungalow", "Mirik, Darjeeling", "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=70", 3200, 4.6, 145, "Lakeside", "homestay", "Dawa Tamang", "Born and raised in Mirik, Dawa loves sharing local culture.", "Charming bungalow steps from the serene Sumendu Lake. Ideal for couples seeking tranquility amid orange orchards and misty lakeside walks.", 0, 4],
                        ["Kalimpong Heritage Home", "Kalimpong, Darjeeling", "https://images.unsplash.com/photo-1596700209699-7d8cc1ab1e48?w=600&q=70", 2800, 4.5, 89, "Heritage", "homestay", "Rinzing Lepcha", "History enthusiast who loves discussing Kalimpong's trading past.", "A beautifully preserved 1930s colonial home with spectacular views of Mt Kanchenjunga on clear days. Original wooden floors, antique furniture, and rooftop garden.", 0, 5],
                        ["Tiger Hill Sunrise Cottage", "Tiger Hill, Darjeeling", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=70", 3800, 4.8, 203, "Sunrise View", "homestay", "Sonam Bhutia", "Mountain guide with 15 years experience on Himalayan trails.", "Wake at 4am for the legendary Kanchenjunga sunrise — your host will guide you to the viewpoint. Cozy mountain cottage with wood-burning fireplace and panoramic windows.", 0, 3],
                        // Sikkim
                        ["Hidden Forest Retreat", "Pelling, Sikkim", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70", 5200, 4.8, 187, "Premium", "resort", "Karsang Sherpa", "Passionate about local Sikkimese culture and Buddhist traditions.", "Nestled in a private forest above Pelling with direct views of the Kanchenjunga range. Spacious eco-cottages with floor-to-ceiling glass walls, private decks, and a natural stream.", 1, 8],
                        ["Kanchenjunga View Villa", "Gangtok, Sikkim", "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=600&q=70", 6000, 4.7, 256, "Mountain View", "homestay", "Tenzin Wangchuk", "Retired Himalayan trekking guide turned gracious host.", "Premium villa in upper Gangtok with breathtaking 180-degree mountain views. Three beautifully appointed rooms, a private garden, rooftop dining, and home-cooked Sikkimese meals included.", 1, 5],
                        ["Yuksom Monastery Retreat", "Yuksom, Sikkim", "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=70", 2200, 4.7, 78, "Spiritual", "homestay", "Doma Sherpa", "Former monk turned welcoming host, offers meditation sessions.", "A peaceful retreat adjacent to the historic Dubdi Monastery, the oldest in Sikkim. Perfect for trekkers starting the Goecha La route. Meditation sessions at sunrise available.", 1, 4],
                        ["Ravangla Alpine Birding Stay", "Ravangla, Sikkim", "https://images.unsplash.com/photo-1570220104815-5e042c341a7d?w=600&q=70", 2500, 4.7, 62, "Birding", "resort", "Dawa Yangchen", "Certified birdwatching guide, has identified 400+ species locally.", "A paradise for birdwatchers at 7,000ft with access to rare Himalayan species. Comfortable cottage rooms, binoculars provided, and expert guided morning treks through rhododendron forests.", 0, 6],
                        // Nagaland
                        ["Naga Heritage Longhouse", "Khonoma, Nagaland", "https://images.unsplash.com/photo-1570220104815-5e042c341a7d?w=600&q=70", 3800, 4.95, 94, "Unique", "homestay", "Vizolie Angami", "Tribal elder who leads cultural storytelling evenings around bonfires.", "Stay in an authentic Angami Naga longhouse in the world's first 'Green Village'. Handwoven textiles, drumming performances, traditional Naga food, and a window into a UNESCO-recognized culture.", 0, 4],
                        ["Kohima War Memorial Stay", "Kohima, Nagaland", "https://images.unsplash.com/photo-1596700209699-7d8cc1ab1e48?w=600&q=70", 2600, 4.5, 47, "Historical", "homestay", "Kesho Sema", "History teacher and proud Naga heritage advocate.", "A charming guesthouse minutes from the historic Kohima War Cemetery. Enjoy homemade Naga rice beer, smoked pork with bamboo shoot, and fascinating stories of WWII's impact on Nagaland.", 0, 5],
                        ["Hornbill Festival Retreat", "Kisama, Nagaland", "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=600&q=70", 4200, 4.8, 118, "Festival Hub", "homestay", "Lhounuo Shohe", "Cultural events coordinator for Nagaland Tourism.", "The closest stay to Naga Heritage Village, where Hornbill Festival unfolds. Rooftop views of the festival grounds, cultural dance performances, and exclusive tribe-hosted dinners each evening.", 0, 6],
                        ["Mokokchung Village Homestay", "Mokokchung, Nagaland", "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=70", 1800, 4.4, 31, "Community", "homestay", "Tola Ao", "Community development worker passionate about responsible tourism.", "Experience genuine Ao Naga village life — help harvest rice, learn to weave traditional shawls, and share meals with an extended family. The most authentic cultural immersion in Northeast India.", 0, 3]
                    ];

                    db.serialize(() => {
                        const stmt = db.prepare("INSERT INTO listings (title, location, image, price, rating, reviews, badge, category, host, hostAbout, description, permit, totalRooms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                        listings.forEach(l => stmt.run(l));
                        stmt.finalize(() => {
                            console.log("Database seeded with 12 rich sample listings.");
                        });
                    });
                } else {
                    console.log(`Database already has ${row.count} listings.`);
                }
            });
        });
    }
});

module.exports = db;
