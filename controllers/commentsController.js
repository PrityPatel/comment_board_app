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

module.exports = {
  index: index
};
