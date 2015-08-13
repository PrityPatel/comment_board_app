var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/User');

var usersController    = require('../controllers/usersController');
var sessionsController = require('../controllers/sessionsController');
var commentsController = require('../controllers/commentsController');

/*
 * Passport auth helpers.
 */

var authenticateUser = passport.authenticate(
  'local',
  {failureRedirect: '/login'}
);

var isLoggedIn = function(req, res, next) {
  if (!req.isAuthenticated()) res.redirect('/login');
  return next();
};

var loadCurrentUser = function(req, res, next) {
  if (req.session.passport) {
    User
      .findOne({ username: req.session.passport.user })
      .then(
        function(user) {
          // attach the current User instance to the request!
          req.currentUser = user;
          next();
        }, function(err) {
          return next(err);
      });
  } else {
    next();
  }
};

/*
 * Define routes.
 */

router.get('/', commentsController.index);

router.get( '/register', usersController.new);
router.post('/register', usersController.create);

router.get( '/login',  sessionsController.new);
router.post('/login',  authenticateUser, sessionsController.create);
router.get( '/logout', sessionsController.destroy);

router.get( '/comments',     commentsController.index);
router.post('/comments',     isLoggedIn, loadCurrentUser, commentsController.create);
router.get( '/comments/:id', commentsController.show);

module.exports = router;
