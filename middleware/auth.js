const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authorizationMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    const { id, username } = payload;
    req.user = { id, username };
    // console.log(payload);
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      "ACCESS DENIED: You don't have access to this resource."
    );
  }
};

module.exports = authorizationMiddleware;
