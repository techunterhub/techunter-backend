const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const generateToken = require('../utility/jwt');

const Register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      role
    });

    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.json(
      { access: token,
        data:user._id
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

const adminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isadmin: true,role:'admin' }, { new: true });
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};



module.exports = {
  Register,
  getUser,
  login,
  getUserById,
  adminStatus
};