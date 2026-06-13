const mongoose = require('mongoose');
const User = require('./../models/user.model');
const { successResponse, errorResponse } = require('../utils/response.util');
const { 
    findUserByEmail, 
    getPaginatedUsers, 
    findUserById, 
    findAndUpdateUser, 
    findAndDeleteUser 
} = require('../helpers/user.helpers');

const createUser = async (req, res) => {
    try{
        const { userId, name, email, role, bio, age, social } = req.body;
        const isUserAlreadyPresent = await findUserByEmail(email);
        if(isUserAlreadyPresent){
            return errorResponse(res, 409, {}, 'User with this email already exists.')
        }
        const newUser = new User({ userId, name, email, role, bio, age, social });
        const saved = await newUser.save();
        return successResponse(res, 201, saved, 'User created successfully.');
    }
    catch(error){
        console.error(error);
        const statusCode = (error.name === 'ValidationError') ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
};

const getAllUsers = async (req, res) => {
    try{
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * size;
        const [users, total] = await getPaginatedUsers(size, skip);
        return successResponse(res, 200, { users, total, }, 'Users fetched successfully');
    }
    catch(error){
        const statusCode = (error.name === 'ValidationError') ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
};

const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await findUserById(id);
        if(!user){
            return errorResponse(res, 404, {}, 'Requested user was not found');
        }
        return successResponse(res, 200, user, 'Requested user was found');
    }
    catch(error){
        const statusCode = (error.name === 'ValidationError') ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

const updateUser = async (req, res) => {
    try {
        const payload = req.body;
        const { id } = req.params;
        const user = await findUserById(id);
        if(!user){
            return errorResponse(res, 404, {}, 'Requested user was not found.');
        }
        if('social' in payload){
            payload['social'] = {
                ...user['social'], 
                ...payload['social']
            };
        }
        const updatedUser = await findAndUpdateUser(id, payload);
        return successResponse(res, 200, updatedUser, 'User has been updated successfully.');
    }
    catch(error) {
        const statusCode = (error.name === 'ValidationError') ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await findUserById(id);
        if(!user){
            return errorResponse(res, 404, {}, 'Could not delete, as the user does not exist.');
        }
        await findAndDeleteUser(id);
        return successResponse(res, 200, {}, 'User deleted successfully.');
    }
    catch(error){
        const statusCode = (error.name === 'ValidationError') ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

module.exports = {
    createUser, getAllUsers, getUserById, updateUser, deleteUser
};