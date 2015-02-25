// Includes

var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


// Server config

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username:username}).exec(function(err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    if (user) {
        done (null, user.id);
    }
});

passport.deserializeUser (function(user, done) {
    User.findOne({_id:id}).exec(function(err,user) {
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

require('./server/config/routes')(app);

// Server initialization

app.listen(config.port);
console.log('listening on port ' + config.port + '...');
