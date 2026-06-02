const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

function validate(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new AppError(error.array()[0].msg, 400);
  }
  next();
}

module.exports = validate;
