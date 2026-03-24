const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api', apiRoutes);

// Fallback: only redirect non-file requests to index.html
app.get('/{*path}', (req, res, next) => {
    const url = req.path;
    // Let express.static handle known file extensions
    if (url.match(/\.(html|css|js|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/i)) {
        return next();
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Local link: http://localhost:${PORT}`);
});
