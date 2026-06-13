const {
    errorResponse, successResponse
} = require('./../utils/response.util');
const {
    verifyToken,
} = require('./../helpers/apiGateway.helpers');

const checkAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return errorResponse(res, 401, null, 'No token provided.');
        }
        const result = await verifyToken(token);
        const { userId } = result.data;
        req.headers['x-user-id'] = userId;
        req.userId = userId;
        next();
    }
    catch(error){
        return errorResponse(res, 401, error, 'Unauthorized.');
    }
}

module.exports = {
    checkAuth
}