const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateIdeaInput(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : '';

  if (Validator.isEmpty(data.body)) {
    errors.text = 'Idea body is required';
  }

  if (!Validator.isLength(data.body, { min: 2, max: 80 })) {
    errors.text = 'Idea must be between 5 and 80 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};