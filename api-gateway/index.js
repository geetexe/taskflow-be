require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const apiGatewayRouter = require('./src/routes/apiGateway.router');
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 mins
    max: 100, // max 100 req per IP per window
    message: {
        success: false,
        message: 'Too many requests, please try again later.'
    }
});

// app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(limiter);

const PORT = process.env.PORT || 3000;

// ROUTES ----------- [START]

app.use("/", apiGatewayRouter);

// ROUTES ----------- [END]

const spinServer = () => app.listen(PORT, () => console.log(`api-gateway is up on PORT: ${PORT}`));

spinServer();