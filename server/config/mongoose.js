var mongoose = require('mongoose'),
userModel = require('../models/User');

module.exports = function (config) {
    // Connect to Mongo Database

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Meanapp db opened');
    });

    userModel.createDefaultUsers();
};
