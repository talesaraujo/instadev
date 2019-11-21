const mongoose = require('../db/index');


const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imgsrc: {
        // Temp
        type: String
    },
    caption: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;