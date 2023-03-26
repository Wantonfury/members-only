const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
  username: { type: String, minLength: 3, required: true },
  password: { type: String, minLength: 8, required: true },
  member: { type: Boolean, default: false },
  admin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserModel);