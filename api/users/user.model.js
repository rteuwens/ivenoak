// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// subdocument
const transactionSchema = require('../transactions/transaction.model').schema;

// create user model
const userSchema = mongoose.Schema({

    // auth data for passport's local strategy 
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [8, 'Password must be at least 4 character long']
    },
    fullName: {
        type: String
    },

    // every user will have transactions linked to their account
    transactions: [transactionSchema]

    // these transactions can be aggregated into a portfolio
    // portfolio: portfolioSchema
});

// password hashing middleware
// http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// methods
userSchema.methods.validPassword = async function(password) {
    const match = await bcrypt.compare(password, this.local.password);
    return match;
};

// imported in './user.routes.js'
module.exports = mongoose.model('User', userSchema);