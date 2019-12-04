const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');


router.get('/users', userController.getUsers);

router.get('/users/:username', userController.fetchUser);

// Register route
router.post('/signup', userController.createUser);

// Auth route
router.post('/login', userController.authenticate);

router.put('/users/:username', userController.editUser);

router.delete('/users/:username', userController.deleteUser);



module.exports = router;