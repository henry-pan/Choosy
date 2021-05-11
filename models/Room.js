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
    default: Date.now
  },
  expireAt: {
    type: Date,
    default: Date.now() + 60 * 60 * 1000
  }
});

RoomSchema.index({expireAt: 1}, {expireAfterSeconds: 0 });
module.exports = Room = mongoose.model('Room', RoomSchema);