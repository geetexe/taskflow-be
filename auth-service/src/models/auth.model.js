const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;