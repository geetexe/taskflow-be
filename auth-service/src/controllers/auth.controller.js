const { successResponse, errorResponse } = require('./../utils/response.util');
const {
    findAuthByUserId,
    findAuthByEmail,
    hashPassword,
    saveUserToUserService,
    saveUserToAuthDB,
    checkPassword,
    generateToken,
    verifyToken,
} = require('../helpers/auth.helpers');

const registerUser = async (req, res) => {
    try{
        const { userId, password, email, name, age } = req.body;
        const [existingUserId, existingEmail] = await Promise.all([
            findAuthByUserId(userId), findAuthByEmail(email)
        ]);
        if(existingUserId){
            return errorResponse(res, 409, null, 'userId is already taken.');
        }
        if(existingEmail){
            return errorResponse(res, 409, null, 'Email is already registered.');
        }
        const payload = { userId, name, email, age, };
        await saveUserToUserService(payload);
        const passwordHash = await hashPassword(password);
        await saveUserToAuthDB({ userId, passwordHash, email });
        return successResponse(res, 201, {}, 'User has been created successfully!');
    }
    catch(error){
        const status = error.name === 'ValidationError' ? 400 : 500;
        return errorResponse(res, status, error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { userId, password, rememberMe } = req.body;
        const existingUser = await findAuthByUserId(userId);
        if(!existingUser){
            return errorResponse(res, 404, null, 'User doesn\'t exist.');
        }
        const isPasswordValid = await checkPassword(password, existingUser.passwordHash);
        if(!isPasswordValid){
            return errorResponse(res, 401, {}, 'Invalid password.');
        }
        const payload = { userId };
        const token = generateToken(payload);
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: (rememberMe ? 30 : 7) * (24*60*60*1000),
        });
        return successResponse(res, 200, {}, 'Login successful.');
    }
    catch(error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        return errorResponse(res, status, error);
    }
}

const logout = async (req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return successResponse(res, 200, {}, 'Logged out successfully.');
    }
    catch(error){
        const status = error.name === 'ValidationError' ? 400 : 500;
        return errorResponse(res, status, error,);
    }
}

const verifyUser = async (req, res) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return errorResponse(res, 401, {}, 'No token provided.');
        }
        const { userId } = verifyToken(token);
        return successResponse(res, 200, { userId }, 'Token validation successful.');
    }
    catch(error){
        return errorResponse(res, 401, error, 'Token is invalid or expired.');
    }
}

const checkUserId = async (req, res) => {
    try{
        const { userId } = req.params;
        const isUserAlreadyPresent = await findAuthByUserId(userId);
        return successResponse(res, 200, {
            available: !isUserAlreadyPresent
        }, isUserAlreadyPresent ? 'userId is taken.' : 'userId is available.');
    }
    catch(error){
        return errorResponse(res, 500, error,);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logout,
    verifyUser,
    checkUserId,
};