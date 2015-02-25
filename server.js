// Includes

var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Server config

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

// DB

mongoose.connect('mongodb://localhost/meanapp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('meanapp db opened');
});

// Routes

app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
});

app.get('*', function(req, res) {
    res.render('index');
});

// Server initialization

var port = process.env.PORT || 3030;
app.listen(port);
console.log('listening on port' + port + '...');