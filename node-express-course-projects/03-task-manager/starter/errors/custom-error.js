class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function createCustomAPIError(message, statusCode) {
  return new CustomAPIError(message, statusCode);
}

module.exports = { createCustomAPIError, CustomAPIError };
