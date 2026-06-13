const axios = require('axios');

const verifyToken = async (token) => {
    const { data } = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/verify`, {
        headers: {
            Cookie: `token=${token}`
        }
    });
    return data;
}

module.exports = {
    verifyToken,
}