// to read our .env file
require('dotenv').config();

// imports
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

// give colors to console text
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;

// environment variables with which to configure the app
const {
    HOST,
    PORT,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DATABASE,
    MONGO_URI
} = process.env;

const options = {
    useNewUrlParser: true
};

// set up database connection
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URI}`;
mongoose.connect(uri, options);
const db = mongoose.connection;

// check connection
db.once('open', () => {
    console.log(connected(`connected to ${MONGO_DATABASE} at ${uri}`));
});

// if there are errors
db.on('error', (err) => {
    console.log(error(`Mongoose default error: ${err}`));
});

// initialize application
const app = express();

// home route
app.get('/', (req, res) => res.send('Hello World!'));

// configuring the server where to run/listen
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));