const express = require('express');
const { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/user.controller');

const userRouter = express.Router();

// CREATE USER
userRouter.post('/', createUser);

// GET ALL USERS (PAGINATED)
userRouter.get('/', getAllUsers);

// GET SINGLE USER BY USERID
userRouter.get('/:id', getUserById);

// UPDATE USER PROFILE
userRouter.patch('/:id', updateUser);

// DELETE USER
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;