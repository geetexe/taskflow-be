const express = require('express');
const { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/user.controller');

const userRouter = express.Router();

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - name
 *               - email
 *               - age
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [member, admin]
 *               bio:
 *                 type: string
 *               age:
 *                 type: number
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
 *         description: Email already exists
 */
userRouter.post('/', createUser);

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all users paginated
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
userRouter.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by userId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The userId of the user
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               age:
 *                 type: number
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
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
userRouter.patch('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;