const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  body: {
    type: String,
    required: true
  },
  score: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Idea = mongoose.model('idea', IdeaSchema);