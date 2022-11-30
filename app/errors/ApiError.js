const ApplicationError = require('./ApplicationError');
class ApiError extends ApplicationError {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ApiError;