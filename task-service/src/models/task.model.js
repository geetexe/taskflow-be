const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 10,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
        maxlength: 500,
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    createdBy: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        default: null,
    },
    dueDate: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;