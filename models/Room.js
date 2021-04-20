const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  code: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  ideas: {
    type: Schema.Types.ObjectId,
    ref: 'ideas'
  }
  //users documents in the schema or
  //let socket io handle it
});

module.exports = Room = mongoose.model('Room', RoomSchema);