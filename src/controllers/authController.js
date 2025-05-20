const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

exports.register = async (req, res) => {
    console.log('🔴 REGISTER BODY:', req.body);
    const { username, password } = req.body;
    try {
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ msg: 'Kullanıcı zaten var' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = new User({ username, password: hash });
        await user.save();
        res.status(201).json({ msg: 'Kayıt başarılı' });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

exports.login = async (req, res) => {
    console.log('🔴 LOGIN BODY:', req.body);
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Geçersiz kimlik' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Geçersiz kimlik' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};
