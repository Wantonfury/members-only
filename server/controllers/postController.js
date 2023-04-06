const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const authorization = require('../middleware/authorization');

exports.get_posts = (req, res, next) => {
  Post.find()
    .populate("user")
    .then(posts => res.status(200).json(posts))
    .catch(err => next(err))
}

exports.add_post = [
  body("title", "Title not be empty.")
    .trim()
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters.")
    .isLength({ max: 20 }).withMessage("Title must be at most 20 characters.")
    .escape(),
  body("msg", "Message must be between 3 and 100 characters.")
    .trim()
    .isLength({ min: 3, max: 100})
    .escape(),
  authorization,
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: 'Validation Error',
        errors: errors.array({ onlyFirstError: true }).map(err => err.msg)
      });
    }
    if (!req.authorization) return next("User must be logged in.");
    
    User.findOne({ username: req.username })
      .then(user => {
        if (!user) return next("User not found.");
        
        const post = new Post({
          title: req.body.title,
          msg: req.body.msg,
          date: Date.now(),
          user: user._id
        });
        
        post.save()
          .then(() => res.status(200).send())
          .catch(err => next(err));
      })
      .catch(err => console.log(err));
  }
]

exports.delete = [
  authorization,
  (req, res, next) => {
    if (!req.authorization || !req.admin) return next("User needs to be logged in and an admin.");
    
    Post.findByIdAndRemove(req.params.id)
      .then(() => res.status(200).send())
      .catch(err => next(err));
  }
];