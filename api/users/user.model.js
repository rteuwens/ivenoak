const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // to avoid the error: "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead."
const transactionSchema = require('../transactions/transaction.model')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // user auth data
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String,
        required: true 
    }//,
    
    // every user will have transactions linked to their account
    // transactions: [transactionSchema]

    // these transactions can be aggregated into a portfolio
    // portfolio: portfolioSchema
});

module.exports = mongoose.model('User', userSchema);