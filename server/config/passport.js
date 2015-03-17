var mongoose = require('mongoose'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
FacebookStrategy = require('passport-facebook').Strategy,
User = mongoose.model('User'),
authenticate = require('./authenticate'),
authorize = require('./authorize'),
oauth = require('./oauth');

module.exports = function () {
	
	passport.use(new LocalStrategy(
		function(username, password, done) {
			User.findOne({username:username}, function(err, user) {
				if (err) {return done(err);}
				if (user && user.authenticate(password)) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		}
		));

	passport.use('facebook', new FacebookStrategy({
		clientID: oauth.facebook.clientID,
		clientSecret: oauth.facebook.clientSecret,
		callbackURL: oauth.facebook.callbackURL,
		passReqToCallback: true
	}, function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
        	if(!req.user) {
	            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
	                if (err)
	                    return done(err);
	                if (user) {
	                    return done(null, user);
	                } else {
	                    var newUser = new User();

	                    newUser.facebook.id    = profile.id;            
	                    newUser.facebook.token = token;              
	                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
	                    newUser.facebook.email = profile.emails[0].value;
	                    newUser.facebook.birthday = profile._json.birthday;

	                    newUser.save(function(err) {
	                        if (err)
	                            throw err;	         
	                        return done(null, newUser);
		                });
		            };
		        });
        	} else {
        		console.log(profile);

                var user            = req.user;

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
        	}

            
        });
	}));

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
};