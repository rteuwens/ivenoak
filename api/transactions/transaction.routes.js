// dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// model
const Transaction = require('./api/transactions/transaction.model');

// defining routes
router.get('/transaction', (req, res, next) => {
    const transaction = new Transaction({
        ticker: 'AAPL',
        tradeDate: new Date(),
        transType: 'BUY',
        quantity: 100,
        price: 189,
        currency: 'USD'
    });

    transaction.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /transaction',
                loggedTransaction: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
    next();
});