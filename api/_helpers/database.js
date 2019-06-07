// to read our .env file
require('dotenv').config({ path: __dirname });

// imports
const mongoose = require('mongoose');
const chalk = require('chalk');

// give colors to console text
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;

// fetch env variables
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DATABASE,
    MONGO_URI
} = process.env

var options = {
    useNewUrlParser: true,
    dbName: MONGO_DATABASE
};

// build connection string
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URI}`;
console.log(uri);

// connect
mongoose.connect(uri, options, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(connected(`connected to ${MONGO_DATABASE} at ${uri}`));
    };
});

//export this function and imported by ./../../server.js
module.exports = mongoose.connection;