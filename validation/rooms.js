const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.code = validText(data.code) ? data.code : '';

  if (Validator.isEmpty(data.code)) {
    errors.text = 'Code is required'
  }

  if (!Validator.isLength(data.code, { min : 6, max: 6 })) {
    errors.text = "Code must be 6 characters"
  }
}