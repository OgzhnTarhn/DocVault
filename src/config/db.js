const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:    true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB bağlantısı başarılı');
    } catch (err) {
        console.error('❌ MongoDB bağlantı hatası:', err);
        process.exit(1);
    }
}

module.exports = connectDB;
