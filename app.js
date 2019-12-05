var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

var usersRouter = require('./routes/user');
var postsRouter = require('./routes/post');

const { PostDao } = require('./models/dao');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50bm' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(session({ secret: 'secret' }));
app.set('view engine', 'ejs');

app.use('/', usersRouter);
app.use('/', postsRouter);

app.get('/', (req, res) => {
    const erro = req.session.erro;
    delete req.session.erro;
    if (req.session.username != undefined) {
        (new PostDao()).list(req.session.username, (err, result) => {
            // console.log(result.rows);
            let env = {
                erro,
                posts: result.rows,
                username: req.session.username,
                profile: req.session.username
            };
            for (i = 0; i < env.posts.length; i++) {
                env.posts[i].post = env.posts[i].post.toString('utf8');
            }
            return res.render("profile", env);
        });
    }
    else {
        return res.render("login", { erro });
    }
});

module.exports = app;
