var Comment = require('../models/Comment');

var index = function(req, res, next) {
  Comment
    .find({})
    .then(
      function(comments) {
        res.render(
          'comments/index',
          {
            comments: comments,
            user:     req.user
        });
      }, function(err) {
        return next(err);
    });
};

var show = function(req, res, next) {
  Comment
    .findById(req.params.id)
    .then(
      function(comment) {
        res.render(
          'comments/show',
          {
            comment: comment,
            user:    req.user
        });
      }, function(err) {
        return next(err);
    });
};

var create = function(req, res, next) {
  var newComment = req.body.comment;
  newComment.username = req.user.name;

  Comment
    .create(newComment)
    .then(
      function(comment) {
        res.redirect('/comments/' + comment.id);
      }, function(err) {
        return next(err);
    });
};

module.exports = {
  index:  index,
  show:   show,
  create: create
};
