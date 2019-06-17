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
        minlength : [8, 'Password must be at least 8 character long']
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
userSchema.pre('save', async function hashPassword(next) {
    try {
        var user = this;
        
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();
        
        // generate a salt
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hash = await bcrypt.hash(user.password, salt);
                
        // override the cleartext password with the hashed one
        user.password = hash;
        next();

    } catch(err) {
        if (err) next(err);
    };
});

// imported in './user.routes.js'
module.exports = mongoose.model('User', userSchema);