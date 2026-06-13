const express = require('express');
const {
    registerUser,
    loginUser,
    logout,
    verifyUser,
    checkUserId,
} = require('./../controllers/auth.controller');
const authRouter = express.Router();

authRouter.post('/register', registerUser);

authRouter.post('/login', loginUser);

authRouter.post('/logout', logout);

authRouter.get('/verify', verifyUser);

authRouter.get('/check-userid/:userId', checkUserId);

module.exports = authRouter;