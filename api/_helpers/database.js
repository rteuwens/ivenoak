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
    useFindAndModify: false, // https://mongoosejs.com/docs/deprecations.html#-findandmodify-
    dbName: MONGO_DATABASE
};

// build connection string
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URI}`;

// connect
mongoose.connect(uri, options)

// to avoid the error: "DeprecationWarning: collection.ensureIndex is deprecated." 
mongoose.set('useCreateIndex', true);

// listeners
mongoose.connection.on('connected', () => {
    console.log(connected(`Connected to ${MONGO_DATABASE} at ${uri}`));
});
mongoose.connection.on('error', (err) => {
    console.log(error(`Error: ${err}`));
});
mongoose.connection.on('disconnected', () => {
    console.log(disconnected(`Lost connection to ${MONGO_DATABASE}`));
});


// imported by ./../../server.js
module.exports = mongoose.connection;