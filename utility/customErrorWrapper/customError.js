class CustomError extends Error {
    /**
     * Creates an instance of CustomError
     *
     * @param {String} message - The error message
     * @param {Number} [statusCode=400] - The HTTP status code
     *
     * @example
     * const error = new CustomError('Something went wrong', 500);
     */
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;