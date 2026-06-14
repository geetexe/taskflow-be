require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/utils/connect-db.util');
const userRouter = require('./src/routes/user.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger.util');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// ROUTES ================= [START]

app.use('/users', userRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES ================= [END]


const spinServer = () => app.listen(PORT, () => {
    console.log(`user-service is up on port ${PORT}`);
});

connectDB()
.then(_ => spinServer())
.catch(err => {
    console.error(`user-service failed to connect to the DB`, err);
    process.exit(1);
});