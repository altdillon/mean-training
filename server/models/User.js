var mongoose = require('mongoose'),
encrypt = require('../utilities/encryption');

// Setup User model

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required'},
    lastName: {type:String, required:'{PATH} is required'},
    username:  {
        type: String,
        required:'{PATH} is required',
        unique: true
    },
    salt: {type:String, required:'{PATH} is required'},
    hashed_pwd: {type:String, required:'{PATH} is required'},
    roles: [String],
    oauthID: Number,
    created: Date,
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
        birthday: String
    }
});
userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
}
var User = mongoose.model('User', userSchema);

// Ensure intial data is present

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            console.log('Creating Users...');
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'matt');
            User.create({firstName:'Matthew', lastName:'Thompson',username:'matt', salt:salt, hashed_pwd: hash, roles: ['admin']});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'ben');
            User.create({firstName:'Benjamin',lastName:'Heberlein',username:'ben', salt:salt, hashed_pwd: hash, roles: []});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'deco');
            User.create({firstName:'Anthony',lastName:'DeCamillis',username:'deco', salt:salt, hashed_pwd: hash});
        }
    })
};

exports.createDefaultUsers = createDefaultUsers;