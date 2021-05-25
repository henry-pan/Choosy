const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = "Name cannot be longer than 30 characters.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please enter your name.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Please enter your email.";
  }

  if (Validator.equals(data.name, "Guest")) {
    errors.name = "You're not a guest anymore!"
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email!";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter a password.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Your passwords must match.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};