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

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(User);
        console.log(username);

        User.findById(id, function(err, user) {
            if (err) {return done(err);}
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

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user) {
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

/*

User.findById(id, function(err, user){
        done(err, user);
    })
*/

require('./server/config/routes')(app);


// Server initialization

app.listen(config.port);
console.log('listening on port ' + config.port + '...');
