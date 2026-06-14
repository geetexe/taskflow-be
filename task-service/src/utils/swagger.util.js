const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Service API',
            version: '1.0.0',
            description: 'Task service for TaskFlow',
        },
        servers: [
            { url: 'http://localhost:3002' }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;