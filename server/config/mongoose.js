var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('meanapp db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });
    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0)
        {
            User.create({firstName:'Matthew',lastName:'Thompson',username:'matt'});
            User.create({firstName:'Benjamin',lastName:'Heberlein',username:'ben'});
            User.create({firstName:'Anthony',lastName:'DeCamillis',username:'deco'});
        }
    })
};
