const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth Service API',
            version: '1.0.0',
            description: 'Authentication service for TaskFlow',
        },
        servers: [
            { url: 'http://localhost:3003' }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;