const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var transactionSchema = new Schema({

    ticker: String,
    tradeDate: Date,
    transType: String,
    quantity: Number,
    price: Number,
    currency: String//,
    // fx: {
    //     usd: Number,
    //     eur: Number
    // },
    // tarif: Number,
    // cashMovement: {
    //     usd: Number,
    //     eur: Number
    // }
});

module.exports = mongoose.model('Transaction', transactionSchema);