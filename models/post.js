const mongoose = require('../db/index');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const BASEURL = "http://localhost:3000";


const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imgName: {
        type: String  
    },
    imgSize: {
        type: Number
    },
    imgKey: {
        type: String
    },
    imgUrl: {
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

PostSchema.pre('save', function() {
    if (!this.imgUrl) {
        this.imgUrl = `${BASEURL}/${this.imgKey}`;
    }
});

PostSchema.pre('remove', function() {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', 'tmp', 'uploads', this.imgKey));
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;