const mongoose = require('mongoose');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authorization = require('../middleware/authorization');

const generateToken = (user) => {
  return jwt.sign({ username: user.username, member: user.member, admin: user.admin }, process.env.SECRET_KEY);
}

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
    
    User.findOne({ username: req.body.username })
    .catch(err => console.log(err))
    .then(user => {
      if (user) return res.status(401).send({ msg: 'Username taken.' });
      
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) return next(err);
        
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          member: req.body.member,
          admin: req.body.admin
        });
        
        user.save()
          .then(() => res.status(200).send())
          .catch(err => next(err));
      });
    });
  }
];

exports.login = [
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
    
    passport.authenticate("local", (err, user, response) => {
      if (err) return next(err);
      
      if (!user) {
        res.status(401).send(response);
      } else {
        req.login(user, () => {
          const token = generateToken(user);
          
          res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none'
          }).status(200).json({
            username: user.username,
            member: user.member,
            admin: user.admin
          });
        });
      }
      
    })(req, res, next);
  }
];

exports.relog = [
  authorization,
  (req, res, next) => {
    res.status(200).json({
      username: req.username,
      member: req.member,
      admin: req.admin,
      loggedIn: req.authorization
    });
  }
];

exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    return res.clearCookie('access_token').status(200).send();
  })
}

exports.membership = [
  authorization,
  (req, res, next) => {
    const MEMBERSHIP_CODE = "CHEESE";
    
    if (req.body.code === MEMBERSHIP_CODE) {
      User.findOneAndUpdate({ username: req.username }, { member: true }, { new: true })
        .then(user => {
          const token = generateToken(user);
          
          res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
          }).status(200).send();
        })
        .catch(err => next(err));
    }
    else return res.status(401).send({ msg: "Incorrect code."});
  }
]