const express = require('express');
const {
    registerUser,
    loginUser,
    logout,
    verifyUser,
    checkUserId,
} = require('./../controllers/auth.controller');
const authRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - email
 *               - password
 *               - name
 *               - age
 *             properties:
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               role:
 *                 type: string
 *                 enum: [member, admin]
 *               bio:
 *                 type: string
 *               social:
 *                 type: object
 *                 properties:
 *                   facebook:
 *                     type: string
 *                   linkedin:
 *                     type: string
 *                   instagram:
 *                     type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: userId or email already taken
 */
authRouter.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive JWT cookie
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *               password:
 *                 type: string
 *               rememberMe:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Login successful, cookie set
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 */
authRouter.post('/login', loginUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout and clear JWT cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
authRouter.post('/logout', logout);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify JWT token (internal use)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token valid, returns userId
 *       401:
 *         description: Token invalid or expired
 */
authRouter.get('/verify', verifyUser);

/**
 * @swagger
 * /auth/check-userid/{userId}:
 *   get:
 *     summary: Check if a userId is available
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: userId availability status
 */
authRouter.get('/check-userid/:userId', checkUserId);

module.exports = authRouter;