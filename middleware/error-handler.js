const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  //console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `${field} already exists`,
      ...err,
    });
  } else if (err.name === "ValidationError") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: err.message, name: err.name });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message, err });
};

module.exports = errorHandlerMiddleware;
