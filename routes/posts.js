const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");
const authMiddleware = require('../middlewares/auth');

const upload = require("multer");
const uploadConfig = require("../config/multer");


router.use(authMiddleware);


router.get('/posts', postController.getPosts);

router.get('/posts/:postId', postController.fetchPost);

router.post('/posts', upload(uploadConfig).single("file"), postController.createPost);

router.put('/posts/:postId', postController.editPost);

router.delete('/posts/:postId', postController.deletePost);



module.exports = router;