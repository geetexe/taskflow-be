require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/auth.router');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger.util');

const connectDB = require('./src/utils/connect-db.util');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3003;

// ROUTES ================= [START]

app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES ================= [END]

const spinServer = () => app.listen(PORT, () => console.log(`auth-service is up on port ${PORT}`));

connectDB().then(() => spinServer()).catch((error) => {
    console.error("failed to connect to DB on auth-service", error);
    process.exit(1);
});