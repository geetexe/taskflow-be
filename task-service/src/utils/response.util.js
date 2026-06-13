const successResponse = (res, code, data = {}, message = '') => {
    const response = {
        success: true,
        message, 
        code, 
        data
    };
    return res.status(code).json(response);
}

const errorResponse = (res, code, error, message = 'Something went wrong.') => {
    const response = {
        success: false,
        message, 
        code,
    }
    if(error && process.env.NODE_ENV === 'development'){
        response.error = error;
    }
    return res.status(code).json(response);
}

module.exports = {
    successResponse, errorResponse
};