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

        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        return res.send({ post });
    }
    catch(err) {
        return res.status(400).send({ error: 'Error while fetching post' });
    }
};


const createPost = async (req, res) => {
    try {
        const post = await Post.create({ 
            user: req.userId,                   // Adding userId ref (original poster)
            imgName: req.file.originalname,
            imgSize: req.file.size,
            imgKey: req.file.filename,
            ...req.body,
        }); 

        res.send({ post });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error while posting' });
    }
}


const editPost = async (req, res) => {
    try {
        const newPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });

        if (!newPost) {
            return res.status(404).send({ error: 'Post not found' });
        }
        return res.send({ newPost });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error while editing post' });
    }
}


const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        await post.remove();

        return res.send({ post });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error while deleting post' });
    }
}


module.exports = {
    getPosts, fetchPost, createPost, editPost, deletePost
}