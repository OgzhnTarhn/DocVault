// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = null;

    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.query.token) {
        token = req.query.token;
    }

    if (!token) {
        return res.status(401).json({ msg: 'Token eksik veya yanlış format' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    } catch {
        return res.status(401).json({ msg: 'Token geçersiz' });
    }
};
