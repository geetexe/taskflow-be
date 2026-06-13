require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiGatewayRouter = require('./src/routes/apiGateway.router');
const app = express();

// app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

// ROUTES ----------- [START]

app.use("/", apiGatewayRouter);

// ROUTES ----------- [END]

const spinServer = () => app.listen(PORT, () => console.log(`api-gateway is up on PORT: ${PORT}`));

spinServer();