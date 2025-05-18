// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

async function register(req, res) {
    const { username, password } = req.body;
    // ... kayıt işlemleri
}

async function login(req, res) {
    const { username, password } = req.body;
    // ... login işlemleri
}

module.exports = { register, login };
