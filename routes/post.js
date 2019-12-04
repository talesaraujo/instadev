const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');


router.get('/posts/:username', postController.getPosts);

router.post('/posts', postController.createPost);

router.delete('/posts/:id', postController.deletePost);



module.exports = router;