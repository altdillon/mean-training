  var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    errorHandler = require('errorhandler');

module.exports = function (app, config) {
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: function compile(str, path) {
            return stylus(str).set('filename', path);
        }  
    }));
    app.use(express.static(config.rootPath + '/public'));  
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({secret: 'multi vision unicorns',resave:false,saveUninitialized:false}));
    app.use(passport.initialize());
    app.use(passport.session());
};
