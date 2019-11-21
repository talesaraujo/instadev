const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);


router.get('/posts', (req, res) => {
    return res.send( { ok: true } );
});


module.exports = router;