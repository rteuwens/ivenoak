// third-party imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// local imports
const User = require('./user.model');

// based on https://github.com/cornflourblue/node-mongo-registration-login-api/
// imported by user.routes.js
module.exports = {
    register,
    authenticate,
    update,
    getAll,
    getById,
    delete: _delete
};

// functions
async function register(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw `There is already a registered account for ${userParam.email}`;
    }

    // save user
    const user = new User(userParam);
    await user.save();
}

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
        const { password, ...userWithoutPassword } = user.toObject();
        const token = jwt.sign(
            { sub: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw `There is already a registered account for ${userParam.email}`;
    }

    // copy userParam properties to user
    Object.assign(user, userParam);
    await user.save();
}

async function getAll() {
    return await User.find().select('-password');
}

async function getById(id) {
    return await User.findById(id).select('-password');
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}