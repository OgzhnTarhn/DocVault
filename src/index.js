require('dotenv').config();           // .env dosyasını yükler
const express     = require('express');
const connectDB   = require('./config/db');
const authRoutes  = require('./routes/auth');

const app = express();

// Gelen tüm JSON gövdelerini parse et
app.use(express.json());

// MongoDB bağlantısını başlat
connectDB();

// Basit health-check endpoint
app.get('/', (req, res) => {
    res.send('DocVault API çalışıyor!');
});

// Auth rotalarını yükle: /api/auth/register, /api/auth/login
app.use('/api/auth', authRoutes);

// File rotaları (korunacak)
app.use('/api/files', require('./routes/file'));

// Sunucuyu başlat
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});
