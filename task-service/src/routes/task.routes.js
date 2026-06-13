const express = require('express');
const {
    getAllTasks, 
    getAllTasksByUser, 
    getTaskById, 
    updateTask, 
    deleteTask, 
    createTask
} = require('../controller/task.controller');

const taskRouter = express.Router();

taskRouter.post('/', createTask);

taskRouter.get('/', getAllTasks);

taskRouter.get('/user/me', getAllTasksByUser);

taskRouter.get('/:id', getTaskById);

taskRouter.patch('/:id', updateTask);

taskRouter.delete('/:id', deleteTask);

module.exports = taskRouter;