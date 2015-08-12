var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/commentBoardApp');

var User    = require('./models/User');
var Comment = require('./models/Comment');

// This has gotten difficult enough that we need to create an asynchronous
// series... async.series is essentially a chain of actions that fire in
// order. Each action (function) is passed a callback that calls the next
// action/function in the line. We can trigger this wherever in the action
// we want... even asynchronously in callbacks or other promises!
var async = require('async');

async.series([
  function(next) {
    User
      .remove({})
      .then(
        function(users) {
          console.log("All users removed...");
          next(); // now we go to the next one!
        },
        function(err) {
          console.log(err);
      });
  },
  function(next) {
    Comment
      .remove({})
      .then(
        function(comments) {
          console.log("All comments removed...");
          next(); // now we go to the next one!
        },
        function(err) {
          console.log(err);
      });
  },
  function(next) {
    var newUsers = [
      {name: 'Phil', username: 'pj@ga.co',  password: 'pj'},
      {name: 'Jim',  username: 'jim@ga.co', password: 'pj'},
      {name: 'Mer',  username: 'mer@ga.co', password: 'pj'},
    ];

    var i = 0;

    newUsers.forEach(function(newUser) {
      User.register(
        new User({username: newUser.username, name: newUser.name}),
        newUser.password,
        function(err, user) {
          if (err) console.log(err);
          console.log(user.name + " seeded.");

          i++; if (i === newUsers.length) next(); // now we go to the next one!
      });
    });

  },
  function() {
    var newComments = [
      {username: 'Phil', text: 'Hello!'},
      {username: 'Phil', text: 'Nice work guys!'},
      {username: 'Jim',  text: 'You can say that again!'}
    ];

    Comment
      .create(newComments)
      .then(
        function(comments) {
          console.log(comments.length + " comments seeded.");
        },
        function(err) {
          console.log(err);
      })
      .then(function() {
        mongoose.disconnect();
      });
  }
]);
