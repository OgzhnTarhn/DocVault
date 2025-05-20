require('dotenv').config();
const express   = require('express');
const path      = require('path');
const jwt       = require('jsonwebtoken');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

/* ---------- 1) API rotaları ---------- */
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/files', require('./routes/file'));

/* ---------- 2) /files.html koruması ---------- */
const publicPath = path.join(__dirname, '..', 'public');
app.get('/files.html', (req, res) => {
    const token =
        req.query.token ||
        (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.sendFile(path.join(publicPath, 'files.html'));
    } catch {
        return res.redirect('/login.html');
    }
});

/* ---------- 3) statik dosyalar ---------- */
app.use(express.static(publicPath));   // index.html, login.html, register.html, …

/* ---------- 4) MongoDB ---------- */
connectDB();

/* ---------- 5) Sunucu ---------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
