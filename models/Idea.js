const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  // user: { // comment back in when users are working
  //   type: Schema.Types.ObjectId,
  //   ref: 'users'
  // },
  // room: { // comment back in when rooms are working
  //   type: Schema.Types.ObjectId,
  //   ref: 'rooms'
  // },
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