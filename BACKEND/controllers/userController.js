require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = db.users;

const signUp = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser)
      return res.status(409).json({ message: "Email already exist" });

    let user = await User.create({
      ...req.body,
    });
    res.status(200).json({ message: "Successfully Registered", user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      message = `Email '${email}' is not registered`;
      return res.status(404).json({ message });
    }

    if (user.status === false)
      return res.status(401).json({ message: "Wait for admin approval" });

    const response = { email: user.email, role: user.role };
    const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
      expiresIn: "8h",
    });
    res
      .status(200)
      .json({ message: "Successfully Loged In", accessToken, user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// const forgorPassword = async (req, res) => {

// }

const getAllUsers = async (req, res) => {
  try {
    const result = await User.findAll({ where: { role: "user" } });
    res.status(200).json({ message: "Successfully fetched", result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await User.update(
      { status: true },
      { where: { id: req.body.id } }
    );
    res.status(200).json({ message: "Successful", result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { signUp, signIn, getAllUsers, updateUser };
