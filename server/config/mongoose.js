var mongoose = require('mongoose'),
crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Meanapp db opened');
    });

    // Setup User model

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }
    User = mongoose.model('User', userSchema);
    
    // Ensure intial data is present

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0)
        {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'matt');
            User.create({firstName:'Matthew',lastName:'Thompson',username:'matt', salt:salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'ben');
            User.create({firstName:'Benjamin',lastName:'Heberlein',username:'ben', salt:salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'deco');
            User.create({firstName:'Anthony',lastName:'DeCamillis',username:'deco', salt:salt, hashed_pwd: hash});
        }
    });

    function createSalt () {
        return crypto.randomBytes(128).toString('base64');
    }

    function hashPwd(salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
};
