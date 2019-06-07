// to read our .env file
require('dotenv').config();

// imports
const express = require('express');
const bodyParser = require('body-parser');

// environment variables with which to configure the app
const {
    HOST,
    PORT
} = process.env;

// import db from _helpers
const db = require('./api/_helpers/database')

// initialize application
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes which should handle requests
const userRoutes = require('./api/users/user.routes');
app.use('/user', userRoutes);

// home route
app.get('/', (req, res) => res.send('Hello World!'));

// configuring the server where to run/listen
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));