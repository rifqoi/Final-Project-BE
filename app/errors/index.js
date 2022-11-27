const EmailNotRegisteredError = require("./EmailNotRegisteredError")
const InsufficientAccessError = require("./InsufficientAccessError")
const NotFoundError = require("./NotFoundError")
const WrongPasswordError = require("./WrongPasswordError")
const EmailAlreadyTakenError = require("./EmailAlreadyTakenError")
const ApiError = require("./ApiError")

module.exports = {
  EmailNotRegisteredError,
  InsufficientAccessError,
  NotFoundError,
  WrongPasswordError,
  EmailAlreadyTakenError,
  ApiError,
}
