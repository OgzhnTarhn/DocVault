const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// REGEX’ler
const USER_RE = /^[a-zA-Z0-9]{3,20}$/;
const PASS_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

exports.register = async (req, res) => {
    const { username = '', password = '' } = req.body;

    // ► VALIDATION
    if (!USER_RE.test(username))
        return res.status(400).json({ msg: 'Kullanıcı adı 3-20 harf/rakam olmalı' });
    if (!PASS_RE.test(password))
        return res.status(400).json({ msg: 'Şifre ≥8, 1 büyük, 1 küçük harf ve 1 rakam içermeli' });

    try {
        if (await User.findOne({ username }))
            return res.status(400).json({ msg: 'Bu kullanıcı adı zaten alınmış' });

        const hash = await bcrypt.hash(password, 10);
        await new User({ username, password: hash }).save();
        return res.status(201).json({ msg: 'Kayıt başarılı' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

exports.login = async (req, res) => {
    const { username = '', password = '' } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Geçersiz kullanıcı adı/şifre' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok)  return res.status(400).json({ msg: 'Geçersiz kullanıcı adı/şifre' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Sunucu hatası' });
    }
};
