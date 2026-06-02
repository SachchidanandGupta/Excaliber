const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("name can only be string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .notEmpty()
    .normalizeEmail()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid email address"),

  body("password").trim().notEmpty().withMessage("password is required"),
];

module.exports = {
  registerValidator,
  loginValidator,
};
