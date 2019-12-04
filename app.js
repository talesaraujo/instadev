var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

var usersRouter = require('./routes/user');
var postsRouter = require('./routes/post');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({ secret: 'secret' }));

app.use('/', usersRouter);
app.use('/', postsRouter);

app.get('/', (req, res) => {
    if (req.session.username != undefined) {
        return res.sendFile(__dirname+"/public/profile.html");
    }
    else {
        return res.sendFile(__dirname+"/public/login.html");
    }
});

module.exports = app;
