require('dotenv').config();
const express = require('express');
const path    = require('path');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// 1️⃣ public klasöründeki dosyaları sun
app.use(express.static(path.join(__dirname, '../public')));

// 2️⃣ MongoDB’ye bağlan
connectDB();

// 3️⃣ API rotaları
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/files', require('./routes/file'));

// 4️⃣ Herhangi başka bir GET isteği register/login/files dosyalarına yönlendirilebilir
//    (opsiyonel, SPA ise)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
