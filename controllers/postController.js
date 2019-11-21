const Post = require('../models/post');


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user'); // In order to recover some user info

        return res.send({ posts });
    }
    catch(err) {
        return res.status(400).send({ error: 'Error while retrieving posts'});
    }
};


const fetchPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user'); // Same! :p

        return res.send({ post });
    }
    catch(err) {
        return res.status(400).send({ error: 'Error while fetching post' });
    }
};


const createPost = async (req, res) => {
    try {
        post = await Post.create({ ...req.body, user: req.userId}); // Adding userId ref (original poster)

        res.send({ post });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error while posting' });
    }
}


const editPost = async (req, res) => {
    return res.send({ user: req.userId });
}


const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.postId);

        return res.send({ post });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error while deleting post' });
    }
}


module.exports = {
    getPosts, fetchPost, createPost, editPost, deletePost
}