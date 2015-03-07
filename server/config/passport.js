var mongoose = require('mongoose'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = mongoose.model('User');

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

	/*app.use(function(req, res, next) {
		console.log(req.user);
		next();
	});*/

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