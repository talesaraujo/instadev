const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/instadev',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true    
});

module.exports = mongoose;
