// src/index.js
require('dotenv').config();
const express   = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');  // <-- burası

const app = express();
console.log('>> authRoutes type:', typeof authRoutes);
app.use(express.json());
connectDB();

// Health-check
app.get('/', (req, res) => res.send('DocVault API çalışıyor!'));

// Burada mutlaka bir function ya da Router olmalı:
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
