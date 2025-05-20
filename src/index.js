require('dotenv').config();
const express   = require('express');
const path      = require('path');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// API rotaları
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/files', require('./routes/file'));

// Tek satır: public klasörünü sun
app.use(express.static(path.join(__dirname, '..', 'public')));

connectDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
