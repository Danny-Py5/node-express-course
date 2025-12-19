const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authorizationMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 400);
  }

  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    const { id, username } = payload;
    req.user = { id, username };
    // console.log(payload);
    next();
  } catch (error) {
    throw new CustomAPIError(
      "ACCESS DENIED: You don' have access to this resource.",
      400
    );
  }
};

module.exports = authorizationMiddleware;
