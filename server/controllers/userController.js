const mongoose = require('mongoose');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.signup = [
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters.')
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: 'Validation Error',
        errors: errors.array({ onlyFirstError: true }).map(err => err.msg)
      });
    }
    
    const user = new User({
      username: req.body.username,
      password: req.body.password, // TODO: hash password
      member: req.body.member,
      admin: req.body.admin
    });
    
    user.save()
      .then(() => res.status(200).send())
      .catch(err => next(err));
  }
];