const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const generateToken = require('../utility/jwt');

const Register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      username,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" ,data:user});
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful", data: { user, access_token: token } });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", data: user });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json({ message: "User found", data: users });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const adminStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { isadmin: true,role:'admin' }, { new: true });

    res.status(200).json({ message: "Admin status updated", data: user });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};


module.exports = {
  Register,
  getUsers,
  login,
  getUserById,
  adminStatus
};