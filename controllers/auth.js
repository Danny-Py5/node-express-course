const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcryptjs = require("bcryptjs");
const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError(
      "please provide all values [name, email, password]"
    );
  }

  // hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // create temp user
  const tempUser = { name, email, password: hashedPassword };

  // generate token
  const token = jwt.sign(
    { name, email, id: new Date().getDate() },
    process.env.PRIVATE_KEY,
    { expiresIn: "30d" }
  );
  // save to database
  await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ name, email, token });
};

const login = (req, res) => {
  res.send("login");
};

module.exports = {
  register,
  login,
};
