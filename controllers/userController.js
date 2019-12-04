const { UserDao } = require('../models/dao');
const { UNIQUE_VIOLATION } = require('pg-error-constants');


const User = new UserDao();


const getUsers = (req, res) => {
    User.list((err, query) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        return res.send(query.rows);
    });
}


const fetchUser = (req, res) => {
    const { username } = req.params;

    User.get(username, (err, query) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        if (query.rowCount == 0) {
            return res.status(404).send({ error: "User not found" });
        }
        return res.status(200).send(query.rows[0]);
    });
}


const createUser = (req, res) => {
    const { username, password } = req.body;

    let newUser = {
        username,
        password
    }

    User.create(newUser, (err) => {
        if (err && err.code == UNIQUE_VIOLATION) {
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

    User.update(userMod, (err, query) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        if (query.rowCount == 0) {
            return res.status(404).send({ error: "Given user was not found" });
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
        return res.status(200).send();
    });
}


const authenticate = (req, res) => {
    const { username, password } = req.body;
    const session = req.session;

    User.get(username, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        if (user.password != password) {
            return res.status(401).send({ error: "Invalid password" });
        }

        session.username = username;

        return res.status(200).send({user, auth: "OK"});
    });
}


module.exports = {
    getUsers, fetchUser, createUser, editUser, deleteUser, authenticate
}
