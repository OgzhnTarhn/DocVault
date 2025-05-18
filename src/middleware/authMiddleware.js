// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Authorization header kontrolü
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Token eksik veya yanlış format' });
    }

    // 2. Token’ı ayıkla
    const token = authHeader.split(' ')[1];

    try {
        // 3. Token’ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 4. İstek objesine kullanıcı bilgisini ekle
        req.user = { id: decoded.userId };
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token geçersiz' });
    }
};
