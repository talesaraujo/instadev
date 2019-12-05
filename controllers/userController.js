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

    User.create(newUser, (err, result) => {
        if (err && err.code == UNIQUE_VIOLATION) {
            req.session.erro = 'Usuário já existente';
            return res.redirect('/');
        }
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        req.session.username = newUser.username;
        return res.redirect('/');
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

    User.get(username, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }

        let user = result.rows[0];

        if (!user || user.password != password) {
            console.log('Credenciais inválidas');
            if (user) console.log(user);
            session.erro = 'Credenciais inválidas';
        }
        else session.username = username;
        
        return res.redirect('/');
    });
}

module.exports = {
    getUsers, fetchUser, createUser, editUser, deleteUser, authenticate
}
