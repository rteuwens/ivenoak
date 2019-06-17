// third-party imports
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// local imports
const User = require('./user.model');

// as in https://github.com/cornflourblue/node-mongo-registration-login-api/
// imported by user.routes.js
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// functions
async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email is already taken';
    }
    
    const user = new User(userParam);
    
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    
    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);
    
    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }
    
    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    
    // copy userParam properties to user
    Object.assign(user, userParam);
    
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}