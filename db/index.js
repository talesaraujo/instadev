const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/instadev',
{
    useMongoClient: true
});

module.exports = mongoose;
