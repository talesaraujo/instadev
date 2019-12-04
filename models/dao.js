const { Client } = require('pg');

function newClient() {
    return new Client({
        host: 'localhost',
        post: 5432,
        user: 'postgres',
        password: 'admin',
        database: 'instadev'
    });
}

function UserDao () {
    this.newClient = newClient;

    this.get = function (username, callback) {
        let client = this.newClient();
        client.connect();
        client.query(
            'SELECT * FROM USERS WHERE username = $1',
            [username],
            (err, res) => {
                callback(err, res.rows[0]);
                client.end();
            }
        );
    }

    this.search = function (username, callback) {
        let client = this.newClient();
        client.connect();
        client.query(
            'SELECT username FROM users WHERE username LIKE $1',
            ['%'+username+'%'],
            (err, res) => {
                callback(err, res.rows);
                client.end();
            }
        )
    }

    this.list = function (callback) {
        let client = this.newClient();
        client.connect();
        client.query('SELECT * FROM USERS', (err, res) => {
            callback(err, res.rows);
            client.end();
        });
    }

    this.create = function (user, callback) {
        let client = this.newClient();
        client.connect();
        client.query(
            'INSERT INTO USERS (username, password) VALUES ($1, $2)',
            [user.username, user.password],
            (err, _) => {
                callback(err);
                client.end();
            }
        );
    };

    this.update = function (user, callback) {
        let client = this.newClient();
        client.connect();
        client.query(
            'UPDATE USERS SET password = $2, profile_pic = $3 WHERE username = $1',
            [user.username, user.password, user.profile_pic],
            (err, _) => {
                callback(err);
                client.end();
            }
        );
    };

    this.delete = function (username, callback) {
        let client = this.newClient();
        client.connect();
        client.query(
            'DELETE FROM users WHERE username = $1',
            [username],
            (err, res) => {
                callback(err, res);
                client.end();
            }
        );
    };
}

function PostDao () {
    this.newClient = newClient;

    this.list = function (username, callback) {
        let client = this.newClient();
        client.connect();
        client.query(
            'SELECT * FROM posts WHERE username = $1',
            [username],
            (err, res) => {
                callback(err, res.rows);
                client.end();
            }
        );
    }

    this.create = function (username, image, callback) {
        let client = this.newClient();
        client.connect();
        client.query(
            'INSERT INTO POSTS (username, post) VALUES ($1, $2)',
            [username, image],
            (err, _) => {
                callback(err);
                client.end();
            }
        );
    };

    this.delete = function (id, callback) {
        let client = this.newClient();
        client.connect();
        client.query(
            'DELETE FROM posts WHERE id = $1',
            [id],
            (err, res) => {
                callback(err, res);
                client.end();
            }
        );
    };
}


module.exports = {
    UserDao, PostDao
}
