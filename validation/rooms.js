const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRoomCode(data) {
  let errors = {};

  data.code = validText(data.code) ? data.code : '';

  if (Validator.isEmpty(data.code)) {
    errors.code = 'Room code is required.';
  }

  if (!Validator.isLength(data.code, { min : 6, max: 6 })) {
    errors.code = "Room codes are 6 numbers long!";
  }

  if (!Validator.isNumeric(data.code, { no_symbols: true})) {
    errors.code = "Room codes are all numbers!";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}