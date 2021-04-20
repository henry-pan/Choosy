const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

});