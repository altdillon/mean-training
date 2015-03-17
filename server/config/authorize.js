var passport = require('passport');

exports.authorizeFacebook = function(req, res, next) {
	passport.authorize('facebook', {authType: "reauthenticate", scope: ["email", "public_profile", "user_birthday"]})(req, res, next);
	//callbackURL: '/',
};

exports.authorizeFacebookCallback = function(req, res, next) {
	passport.authorize('facebook')(req, res, next); 
	if(!!req.user.facebook){
		res.status(200);
		return res.send({success:true, user:req.user});
	} else {
		return res.send('Facebook authorization failed');
	}
};