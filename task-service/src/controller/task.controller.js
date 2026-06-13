const Task = require('../models/task.model');
const { successResponse, errorResponse } = require('../utils/response.util');
const { getTasks, getTasksByUser, findTaskById, updateTaskById, deleteTaskById, validateUser } = require('../helpers/task.helper');

const createTask = async (req, res) => {
    try{
        const createdBy = req.headers['x-user-id'];
        const { title, description, status, priority, assignedTo, dueDate } = req.body;
        if(assignedTo){
            try{
                const user = await validateUser(assignedTo);
            }
            catch(error){
                return errorResponse(res, 404, error, 'Assignee does not exist.');
            }
        }
        const newTask = new Task({ title, description, status, priority, createdBy, assignedTo, dueDate });
        const savedTask = await newTask.save();
        return successResponse(res, 201, savedTask, 'Task created successfully.');
    }
    catch(error){
        const statusCode = (error.name === 'ValidationError') ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

const getAllTasks = async (req, res) => {
    try{
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * size;
        const [tasks, total] = await getTasks(size, skip);
        const response = {
            tasks,
            pagination: {
                size, page, total,
            }
        };
        return successResponse(res, 200, response, 'Tasks fetched successfully');
    }
    catch(error){
        const statusCode = (error.name === 'ValidationError') ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

const getAllTasksByUser = async (req, res) => {
    try{
        const userId = req.headers['x-user-id'];
        const size = parseInt(req.query.size) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * size;
        const [tasks, total] = await getTasksByUser(userId, size, skip);
        const response = {
            tasks,
            pagination: {
                size, page, total,
            }
        };
        return successResponse(res, 200, response, 'Tasks by user fetched successfully.');
    }
    catch(error){
        const statusCode = (error.name === 'ValidationError') ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

const getTaskById = async (req, res) => {
    try{
        const { id } = req.params;
        const task = await findTaskById(id);
        if(!task){
            return errorResponse(res, 404, {}, 'Task not found.');
        }
        return successResponse(res, 200, task, 'Task retrieved successfully.');
    }
    catch(error){
        const statusCode = (['ValidationError', 'CastError'].includes(error.name)) ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

const updateTask = async (req, res) => {
    try{
        const payload = req.body;
        const { id } = req.params;
        const existingTask = await findTaskById(id);
        if(!existingTask){
            return errorResponse(res, 404, {}, 'Could not update, as the task was not found.');
        }
        if(payload.assignedTo){
            try{
                await validateUser(payload.assignedTo);
            }
            catch(error){
                return errorResponse(res, 404, error, 'Assigned user does not exist.');
            }
        }
        const updatedTask = await updateTaskById(id, payload);
        return successResponse(res, 200, updatedTask, 'Task updated successfully.');
    }
    catch(error){
        const statusCode = ['ValidationError', 'CastError'].includes(error.name) ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

const deleteTask = async (req, res) => {
    try{
        const { id } = req.params;
        const task = await findTaskById(id);
        if(!task){
            return errorResponse(res, 404, {}, 'Could not delete as the task was not found.');
        }
        await deleteTaskById(id);
        return successResponse(res, 200, {}, 'Task deletion successful.');
    }
    catch(error){
        const statusCode = (['ValidationError', 'CastError'].includes(error.name)) ? 400 : 500;
        return errorResponse(res, statusCode, error);
    }
}

module.exports = {
    getAllTasks, getAllTasksByUser, getTaskById, updateTask, deleteTask, createTask
}