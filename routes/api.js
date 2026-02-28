const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get all listings
router.get('/listings', (req, res) => {
    db.all("SELECT * FROM listings", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Login / Create User (Mock OAuth equivalent)
router.post('/login', (req, res) => {
    const { name, email, photo } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (user) {
            res.json({ message: 'Login successful', user });
        } else {
            // Create user
            db.run('INSERT INTO users (name, email, photo) VALUES (?, ?, ?)', [name, email, photo], function (err) {
                if (err) res.status(500).json({ error: err.message });
                else res.json({ message: 'User created', user: { id: this.lastID, name, email, photo } });
            });
        }
    });
});

// Create Bookings
router.post('/bookings', (req, res) => {
    const { userId, listingId, checkin, checkout, guests, totalPrice, hasGuide } = req.body;
    db.run(
        `INSERT INTO bookings (userId, listingId, checkin, checkout, guests, totalPrice, hasGuide, dateCreated) 
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
        [userId, listingId, checkin, checkout, guests, totalPrice, hasGuide],
        function (err) {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ message: 'Booking successful', id: this.lastID });
        }
    );
});

// Get User Bookings
router.get('/bookings/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all(
        `SELECT b.*, l.title, l.location, l.image 
         FROM bookings b JOIN listings l ON b.listingId = l.id 
         WHERE b.userId = ?`,
        [userId],
        (err, rows) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json(rows);
        }
    );
});

module.exports = router;
