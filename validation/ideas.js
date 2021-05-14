const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateIdeaInput(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : '';

  if (Validator.isEmpty(data.body)) {
    errors.text = 'Idea body is required';
  }

  if (!Validator.isLength(data.body, { min: 1, max: 30 })) {
    errors.text = 'Idea must be between 1 and 30 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};