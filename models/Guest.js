const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: { // fill in other places?
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  }
});

module.exports = Guest = mongoose.model('Guest', GuestSchema);