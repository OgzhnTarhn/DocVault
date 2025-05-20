// src/index.js
require('dotenv').config();
const express = require('express');
const path    = require('path');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// 1) Kök isteğini register.html’e yönlendir
app.get('/', (req, res) => {
    res.redirect('/register.html');
});

// 2) public/ altındaki dosyaları statik sun
app.use(express.static(path.join(__dirname, '../public')));

// 3) MongoDB bağlantısı
connectDB();

// 4) API rotaları
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/files', require('./routes/file'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
