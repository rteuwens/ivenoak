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
        .then(() => res.status(200).json({
            message: `${req.body.email} was successfully registered`
        }))
        .catch(err => next(err));
});

router.post('/sign-in', (req, res, next) => {
    userService.authenticate(req.body)
        .then(token => token ? res.json(token) : res.status(400).json({
            message: 'username or password is incorrect'
        }))
        .catch(err => next(err));
});

router.delete('/delete/:id', (req, res, next) => {
    userService.delete(req.params.id)
        .then(() => res.status(200).json({ message: `successfully deleted ${req.params.id}` }))
        .catch(err => next(err));
});

module.exports = router;