// to read our .env file
require('dotenv').config();

// import database connection from _helpers
require('./api/_helpers/database')

// imports
const express = require('express');
const userRoutes = require('./api/users/user.routes');

// environment variables with which to configure the app
const {
    HOST,
    PORT
} = process.env;

// initialize application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes which should handle requests
app.use('/user', userRoutes);

// home route
app.get('/', (req, res) => res.send('Hello World!'));

// configuring the server where to run/listen
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));