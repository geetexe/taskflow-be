const successResponse = (res, code, data = {}, message = '') => {
    const response = {
        success: true,
        code,
        data,
        message,
    };
    return res.status(code).json(response);
}

const errorResponse = (res, code, error, message = 'Something went wrong') => {
    const response = {
        success: false,
        code,
        message,
    };
    if(error && process.env.NODE_ENV === 'development'){
        response.error = error.message || error;
    }
    return res.status(code).json(response);
}

module.exports = { successResponse, errorResponse };