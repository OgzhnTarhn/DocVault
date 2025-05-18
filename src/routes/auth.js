// src/routes/auth.js
console.log('AuthController exports:', require('../controllers/authController'));

const express = require('express');
const router  = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login',    login);

module.exports = router;
