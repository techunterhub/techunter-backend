const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const generateToken = require('../utility/jwt');

const Register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with that email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: Object.keys(error.errors).map(field => ({
          field,
          message: error.errors[field].message
        }))
      });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { Register };


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