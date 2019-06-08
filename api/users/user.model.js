// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// subdocument
const transactionSchema = require('../transactions/transaction.model').schema;

// create user model
const userSchema = mongoose.Schema({

    // auth data
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },

    // every user will have transactions linked to their account
    transactions: [transactionSchema]

    // these transactions can be aggregated into a portfolio
    // portfolio: portfolioSchema
});

// imported in './user.routes.js'
module.exports = mongoose.model('User', userSchema);

// pattern as seen on: https://www.npmjs.com/package/bcrypt#to-hash-a-password
module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}