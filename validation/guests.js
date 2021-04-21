const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateGuestName(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!Validator.isLength(data.body, { min: 2, max: 20 })) {
    errors.name = "Name must be between 2 and 20 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}