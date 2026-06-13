const User = require('./../models/user.model');

const findUserByEmail = async (email) => await User.findOne({ email });

const getPaginatedUsers = async (size, skip) => await Promise.all([
    User.find().skip(skip).limit(size),
    User.countDocuments()
]);

const findUserById = async (userId) => await User.findOne({userId});

const findAndUpdateUser = async (id, payload) => await User.findOneAndUpdate({ userId: id }, payload, { returnDocument: 'after', runValidators: true });

const findAndDeleteUser = async (id) => await User.findOneAndDelete({ userId: id });

module.exports = {
    findUserByEmail, getPaginatedUsers, findUserById, findAndUpdateUser, findAndDeleteUser
};