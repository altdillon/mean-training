// Includes

var express = require('express'),
    mongoose = require('mongoose');


// Server config

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/routes')(app);

// Server initialization

app.listen(config.port);
console.log('listening on port ' + config.port + '...');
