var passport = require('passport');

var User = require('../models/User');

var newRoute = function(req, res) {
  res.render('users/new');
};

var create = function(req, res) {
  User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function(err, user) {
    if (err) return res.render('auth/register', {user: user});
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};

module.exports = {
  new:    newRoute,
  create: create,
};
