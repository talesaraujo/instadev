const { UserDao } = require('../models/dao');

const User = new UserDao();


const getUsers = (req, res) => {
    User.list((err, query) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        return res.send(query);
    });
}


const fetchUser = (req, res) => {
    const { username } = req.params;

    User.get(username, (err, query) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        if (!query) {
            return res.status(404).send({ error: "User not found" });
        }
        return res.status(200).send(query);
    });
}


const createUser = (req, res) => {
    const { username, password } = req.body;

    let newUser = {
        username,
        password
    }

    User.create(newUser, (err) => {
        if (err && err.code == '23505') {
            return res.status(409).send({ error: 'User already exists'});
        }
        if (err) {
            console.log(error);
            return res.status(500).send({ error: 'Something else'});
        }
        return res.status(201).send(newUser);
    });
}


const editUser = (req, res) => {
    const { username } = req.params;
    const { password, profile_pic } = req.body;

    let userMod = {
        username,
        password,
        profile_pic
    }

    User.update(userMod, (err) => {
        if (err && err.code == '23505') {
            return res.status(409).send({ error: 'User already exists' });
        }
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        return res.status(200).send(userMod);
    });
}


const deleteUser = (req, res) => {
    const { username } = req.params;

    User.delete(username, (err, query) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        if (query.rowCount == 0) {
            return res.status(404).send({ error: "Given user was not found" });
        }
        return res.status(200).send(query);
    });
}


module.exports = {
    getUsers, fetchUser ,createUser, editUser, deleteUser
}
