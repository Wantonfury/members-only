const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, minLength: 3, required: true },
  msg: { type: String, minLength: 5, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Post', PostSchema);