const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRoomCode(data) {
  let errors = {};

  data.code = validText(data.code) ? data.code : '';

  if (Validator.isEmpty(data.code)) {
    errors.code = 'Code is required';
  }

  if (!Validator.isLength(data.code, { min : 6, max: 6 })) {
    errors.code = "Code must have a length of 6";
  }

  if (!Validator.isNumeric(data.code, { no_symbols: true})) {
    errors.code = "Code must all be numbers";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}