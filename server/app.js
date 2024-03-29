require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');

const User = require('./models/user');

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const mongoDB = process.env.MONGODB_URI;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    User.findOne({ username })
    .catch(err => done(err))
    .then(user => {
      if (user == null) return done(null, false, { msg: "Incorrect username."});
      
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) return done(null, user);
        return done(null, false, { msg: "Incorrect password." });
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
})

app.use(cors({ origin: process.env.ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(logger('dev'));
app.use(session({
  secret: "cats",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err
  });
});

module.exports = app;
