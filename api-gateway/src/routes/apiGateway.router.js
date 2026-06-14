const express = require('express');
const apiGatewayRouter = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
const { checkAuth } = require('./../middleware/auth.middleware');

const proxyFactory = (targetType) => createProxyMiddleware({
    target: process.env[targetType],
    changeOrigin: true,
});

// health:
apiGatewayRouter.get('/ping', (req, res) => res.send("pong"));
apiGatewayRouter.get('/health', (req, res) => res.send("<h1>Hello!</h1>"));

//public routes:
apiGatewayRouter.use('/auth', proxyFactory('AUTH_SERVICE_URL'));

//protected routes:
apiGatewayRouter.use('/tasks', checkAuth, proxyFactory('TASK_SERVICE_URL'));
apiGatewayRouter.use('/users', checkAuth, proxyFactory('USER_SERVICE_URL'));

module.exports = apiGatewayRouter;