// auth.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userModel.createUser(email, hashedPassword);
};

const authenticateUser = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
};

module.exports = { registerUser, authenticateUser };
