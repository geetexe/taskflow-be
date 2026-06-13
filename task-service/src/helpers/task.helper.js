const axios = require('axios');
const Task = require('../models/task.model');

const getTasks = async (size, skip) => await Promise.all([
    Task.find().skip(skip).limit(size),
    Task.countDocuments()
]);

const getTasksByUser = async (id, size, skip) => await Promise.all([Task.find({ createdBy: id }).skip(skip).limit(size), Task.countDocuments({ createdBy: id })]);

const findTaskById = async (id) => await Task.findById(id);

const deleteTaskById = async (id) => await Task.findByIdAndDelete(id);

const updateTaskById = async (id, payload) => await Task.findByIdAndUpdate(id, payload, {
    returnDocument: 'after', runValidators: true,
});

const validateUser = async (userId) => {
    const { data } = await axios.get(`${process.env.USER_SERVICE_URL}/users/${userId}`);
    return data;
}

module.exports = {
    getTasks, getTasksByUser, findTaskById, updateTaskById, deleteTaskById, validateUser,
};