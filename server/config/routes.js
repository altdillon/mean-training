var authenticate = require('./authenticate'),
authorize = require('./authorize'),
mongoose = require('mongoose'),
User = mongoose.model('User'),
users = require('../controllers/users');

module.exports = function (app) {
    app.get('/api/users', authenticate.requiresRole('admin'), users.getUsers);

    app.post('/api/users', users.createUser);

    app.put('/api/users', users.updateUser);


    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', authenticate.authenticate);

    app.get('/authorize/facebook', authorize.authorizeFacebook);
    
    app.get('/authorize/facebook/callback', authorize.authorizeFacebookCallback);
    
    app.post('/logout', function (req, res) {
    	req.logout();
    	res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};
