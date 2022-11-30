const EmailNotRegisteredError = require("./EmailNotRegisteredError")
const InsufficientAccessError = require("./InsufficientAccessError")
const NotFoundError = require("./NotFoundError")
const EmailAlreadyTakenError = require("./EmailAlreadyTakenError")
const WrongPasswordError = require("./WrongPasswordError")
const ApiError = require("./ApiError");

module.exports = {
  EmailNotRegisteredError,
  InsufficientAccessError,
  NotFoundError,
  WrongPasswordError,
  EmailAlreadyTakenError,
  ApiError
}
