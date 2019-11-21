const mongoose = require('../db/index');


const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;