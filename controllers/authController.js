const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 2592000 });
}


const register = async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(409).send({ error: 'User already exists' })
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user, token: generateToken({ id: user.id })});
    }
    catch (err) {
        return res.status(400).send({ error: 'Registration failed'});
    }
};


const authenticate = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id })});
};



module.exports = { register, authenticate }