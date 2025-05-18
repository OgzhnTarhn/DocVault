const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

async function register(req, res) { /* … */ }
async function login(req, res)    { /* … */ }

module.exports = { register, login };
