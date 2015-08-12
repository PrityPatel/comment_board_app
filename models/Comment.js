var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  username:   String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  text:       String
});

module.exports = mongoose.model('Comment', commentSchema);
