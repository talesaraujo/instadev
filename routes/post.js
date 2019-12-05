const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');


router.get('/posts/:username', postController.getPosts);

router.post('/posts', postController.createPost);

router.get('/posts/delete/:id', postController.deletePost);



module.exports = router;
