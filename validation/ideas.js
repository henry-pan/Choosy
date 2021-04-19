// validation/ideas.js

const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateIdeaInput(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : '';

  if (Validator.isEmpty(data.body)) {
    errors.body = 'Idea body is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};