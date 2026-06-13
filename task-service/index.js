require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const taskRouter = require('./src/routes/task.routes');

const connectDB = require('./src/utils/connect-db.util');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3002;

// ROUTES ================= [START]

app.use('/tasks', taskRouter);

// ROUTES ================= [END]

const spinServer = () => app.listen(PORT, () => console.log(`task-service is up on port ${PORT}`));

connectDB().then(_ => spinServer()).catch(err => {
    console.error(`task-service failed to connect to the DB`, err);
    process.exit(1);
});