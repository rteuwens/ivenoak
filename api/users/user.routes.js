// dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// model
const User = require('./user.model');

// routes
router.post('/sign-up', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({
                    message: 'An account already exists under this email'
                });
            } else {
                var newUser = new User({
                    email: req.body.email,
                    password: req.body.password 
                });
                newUser.save( (err) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Something went wrong when registering',
                            body: err.message
                        });  
                    }; 
                    res.status(200).json({
                        message: 'User registered',
                        body: newUser
                    });
                });
            }
        });
});

router.post('/sign-in', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'No such user found'
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '1h'
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed' 
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
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