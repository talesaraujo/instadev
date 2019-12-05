const { PostDao } = require('../models/dao');
const { UNIQUE_VIOLATION } = require('pg-error-constants');

const Post = new PostDao();


const getPosts = (req, res) => {
    const { username } = req.params;

    Post.list(username, (err, query) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        if (query.rowCount == 0) {
            return res.status(404).send({ 
                error: "Either given user was not found or there is no post associated with this user" }
            );
        }
        return res.send(query.rows);
    });
}


const createPost = (req, res) => {
    let body = req.body.split('\n');
    let username = body[1].split('=')[1].replace(/\s/g, '');
    let image = body[0].substring(body[0].search('=') + 1);

    let newPost = {
        username,
        image
    }

    console.log(newPost.username);

    Post.create(newPost.username, newPost.image, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Something else that I'm lazy to figure it out"});
        }
        return res.redirect('/');
    });
}


const deletePost = (req, res) => {
    const { id } = req.params;

    Post.delete(id, (err, query) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        }
        if (query.rowCount == 0) {
            return res.status(404).send({ error: "Given post was not found" });
        }
        return res.redirect('/');
    });
}



module.exports = {
    getPosts, createPost, deletePost
}
