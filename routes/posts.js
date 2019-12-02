const express = require('express');
const router = express.Router();

//const multer = require('multer');
//const multerConfig = require("../config/multer");

const postController = require("../controllers/postController");
const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);


router.get('/posts', postController.getPosts);

router.get('/posts/:postId', postController.fetchPost);

router.post('/posts', postController.createPost);

router.put('/posts/:postId', postController.editPost);

router.delete('/posts/:postId', postController.deletePost);



module.exports = router;