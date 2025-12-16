const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  } else if (err.name === "CastError") {
    return res.status(400).json({ msg: "Invalid ID" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ msg: err.message });
  } else if (err.type === "entity.parse.failed") {
    return res.status(400).json({ msg: "Invalid JSON" });
  }
  console.log(err);
  return res.status(500).json({ msg: "Something went wrong", error: err });
};

module.exports = errorHandlerMiddleware;
