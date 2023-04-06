#! /usr/bin/env node

console.log('This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const bcrypt = require('bcryptjs');
const async = require('async')
const User = require('./models/user')
const Post = require('./models/post')


const mongoose = require('mongoose');

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const users = [];
const posts = [];

function clearDB(cb) {
  async.parallel([
    async function(callback) {
      await User.deleteMany({});
    },
    async function(callback) {
      await Post.deleteMany({});
    }
  ], cb);
}

function userCreate(username, password, member, admin, cb) {
  const user = new User({ username, password, member, admin });
  
  user.save()
    .then(user => {
      console.log("New user: " + user);
      users.push(user);
      cb(null, user);
    })
    .catch(err => cb(err, null));
}

function postCreate(title, msg, date, user, cb) {
  const post = new Post({ title, msg, date, user });
  
  post.save()
    .then(post => {
      console.log("New post: " + post);
      posts.push(post);
      cb(null, post);
    })
    .catch(err => cb(err, null));
}

function createUsers(cb) {
  async.series([
    function(callback) {
      userCreate('adminman', bcrypt.hashSync('password123', 10), true, true, callback);
    },
    function(callback) {
      userCreate('ThatGuy', bcrypt.hashSync('password', 10), true, false, callback);
    },
    function(callback) {
      userCreate('pleb', bcrypt.hashSync('password321', 10), false, false, callback);
    },
  ], cb);
}

function createPosts(cb) {
  async.series([
    function(callback) {
      postCreate(
        'Hello World!',
        'Welcome to this basic, simple website! This shall be the very first message to greet you all. Membership code: CHEESE',
        Date.now(),
        users[0],
        callback
      );
    },
    
    function(callback) {
      postCreate(
        'Test Message',
        'Just a simple test to see if it all works.',
        Date.now(),
        users[1],
        callback
      );
    },
    
    function(callback) {
      postCreate(
        'Lorem Ipsum',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem ante, tincidunt sed tempus accumsan, efficitur ut ligula. Donec ut ex nec diam venenatis dictum nec eu nisl. Cras varius velit in tortor dictum, porta feugiat sem interdum. Fusce finibus ut lorem ut laoreet. Donec vulputate ligula sit amet mi sollicitudin, id blandit ligula sodales. Proin ut turpis a est efficitur gravida. In varius odio vel massa vehicula vulputate accumsan id elit. Quisque luctus erat id massa pellentesque tincidunt. Praesent auctor vel urna sit amet lobortis. Quisque condimentum purus sed bibendum dictum. Nullam eu ante massa. Cras pulvinar vel diam.',
        Date.now(),
        users[2],
        callback
      );
    },
    
  ], cb);
}

async.series([
  clearDB,
  createUsers,
  createPosts
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



