var express = require('express');
var passport = require('passport');
var router = express.Router();

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

/*
 * Define routes.
 */

router.get('/', commentsController.index);

router.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret', {user: req.user});
});

router.get( '/register', usersController.new);
router.post('/register', usersController.create);

router.get( '/login',  sessionsController.new);
router.post('/login',  authenticateUser, sessionsController.create);
router.get( '/logout', sessionsController.destroy);

router.get( '/comments', commentsController.index);

module.exports = router;
