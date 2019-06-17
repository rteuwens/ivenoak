// third-party imports
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// local imports
const User = require('./user.model');
const userService = require('./user.service')

// based on https://github.com/cornflourblue/node-mongo-registration-login-api/
// routes
router.post('/sign-up', (req, res, next) => {
    userService.register(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.post('/sign-in', (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
});

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(
            res.status(200).json({
                message: 'User deleted'
            })
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;