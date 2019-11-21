const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);


// Test authorization middleware
router.get('/test', (req, res) => {
    return res.send( { ok: true } );
});


module.exports = router;