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
        if (query.length == 0) {
            return res.status(404).send({ 
                error: "Either given user was not found or there is no post associated with this user" }
            );
        }
        console.log(query);
        return res.send(query);
    });
}


const createPost = (req, res) => {
    const { username, image } = req.body;

    let newPost = {
        username,
        image
    }

    Post.create(newPost.username, newPost.image, (err) => {
        if (err && err.code == UNIQUE_VIOLATION) {
            return res.status(409).send({ error: 'User already exists'});
        }
        if (err) {
            console.log(error);
            return res.status(500).send({ error: "Something else that I'm lazy to figure it out"});
        }
        return res.status(201).send(newPost);
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
        return res.status(200).send(query);
    });
}



module.exports = {
    getPosts, createPost, deletePost
}
