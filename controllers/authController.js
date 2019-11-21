const User = require('../models/user');


const register = async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' })
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send(user);
    }
    catch (err) {
        return res.status(400).send({ error: 'Registration failed'});
    }
};


const authenticate =  (req, res) => {
    return res.send('ok');
};



module.exports = { register, authenticate }