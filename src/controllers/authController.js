// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const User   = require('../models/User');

async function register(req, res) {
    const { username, password } = req.body;
    try {
        // 1. Aynı isimde kullanıcı var mı kontrolü
        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(400).json({ msg: 'Kullanıcı zaten var' });
        }
        // 2. Parolayı hash’le
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        // 3. Yeni kullanıcı oluştur ve kaydet
        const user = new User({ username, password: hash });
        await user.save();
        // 4. Başarılı cevap
        return res.status(201).json({ msg: 'Kayıt başarılı' });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ msg: 'Sunucu hatası' });
    }
}

module.exports = { register /*, login */ };
