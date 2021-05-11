const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  code: {
    type: String,
    required: true
  },
  ideas: {
    type: Schema.Types.ObjectId,
    ref: 'ideas'
  },
  guests: {
    type: Schema.Types.ObjectId,
    ref: 'guests'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  },
});

module.exports = Room = mongoose.model('Room', RoomSchema);