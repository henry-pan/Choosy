const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  roomId: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  score: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  }
});

module.exports = Idea = mongoose.model('idea', IdeaSchema);