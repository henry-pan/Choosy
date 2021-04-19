const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// date: {
//   type: Date,
//   default: Date.now
// }

// const User = mongoose.model('users', UserSchema); // the name string needs to match passport.js include
// module.exports = User;
module.exports = User = mongoose.model('User', UserSchema);