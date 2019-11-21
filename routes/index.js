var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    return res.send("Hello Instadev!");
});

module.exports = router;
