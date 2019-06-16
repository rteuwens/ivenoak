// to read our .env file for environment variables
require('dotenv').config();

// third-party imports
const express = require('express');
const cors = require('cors');

// local imports
const connection = require('./api/_helpers/database');
const userRoutes = require('./api/users/user.routes');

// initialize application
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(passport.initialize());
// app.use(passport.session());

// Routes which should handle requests
app.use('/user', userRoutes);

// home route
app.get('/', (req, res) => res.send('Hello World!'));

// configuring the server where to run/listen
const {
    HOST,
    PORT
} = process.env;
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));