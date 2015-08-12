var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
  // the passport-local-mongoose module will automatically
  // create a username and other fields for the hash, etc.
  // feel free to add additional fields below
  name: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);