const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Guest = mongoose.model('Guest', GuestSchema);