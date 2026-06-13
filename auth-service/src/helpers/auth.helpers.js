const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model');

const findAuthByUserId = async (userId) => await Auth.findOne({ userId });

const findAuthByEmail = async (email) => await Auth.findOne({ email });

const hashPassword = async (password) => await bcrypt.hash(password, 10);

const saveUserToUserService = async (payload) => await axios.post(`${process.env.USER_SERVICE_URL}/users`, payload);

const saveUserToAuthDB = async (payload) => {
    const auth = new Auth(payload);
    return await auth.save();
}

const generateToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

const verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY);

const checkPassword = async (pwd, pwdHash) => await bcrypt.compare(pwd, pwdHash);

module.exports = {
    findAuthByUserId,
    findAuthByEmail,
    hashPassword,
    saveUserToUserService,
    saveUserToAuthDB,
    checkPassword,
    generateToken,
    verifyToken,
}