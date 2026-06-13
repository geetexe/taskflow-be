const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        minlength: 3,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member',
    },
    bio: {
        type: String,
        maxlength: 200,
        default: '',
    },
    age: {
        type: Number,
        min: 18,
        required: true,
    },
    social: {
        facebook: {
            type: String,
            default: '',
        },
        linkedin: {
            type: String,
            default: '',
        },
        instagram: {
            type: String,
            default: '',
        },
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;