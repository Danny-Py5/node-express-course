const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.SECRET_PRIVATE_KEY, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });

  //   res.send("login/sining/register/signup");
};

const dashboard = (req, res, next) => {
  const { user } = req;

  luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
