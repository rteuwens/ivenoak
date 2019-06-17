// to read our .env file for environment variables
require('dotenv').config();

// third-party imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

// local imports
const connection = require('./api/_helpers/database');
const userRoutes = require('./api/users/user.routes');
const errorHandler = require('./api/_middleware/errorhandler');

// initialize application
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// log incoming requests & handle errors globally
app.use(morgan('dev'));

// Routes which should handle requests
app.use('/user', userRoutes);

// home route
app.get('/', (req, res) => res.send('Hello World!'));

// global error handler
app.use(errorHandler);

// configuring the server where to run/listen
const {
    HOST,
    PORT
} = process.env;
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));