const jwt = require("jsonwebtoken")
const User = require("../models/user.models")
const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv")

dotenv.config()

const protect = asyncHandler(async (
  req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY || '')

      req.user = await User.findById(decode.sub).select("-password")
      if (!req.user || req.user == null) {
        res.status(404)
        throw new Error("user is not found")
      }
      next()
    } catch (error) {
      console.log(error)
      res.status(403).json({ message: "Not Authorized,token expire" })
    }
  }
  if (!token) {
    res.status(403);
    throw new Error("Not authorized, no token");
  }
})


const admin = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (requiredRole.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ message: `Only ${requiredRole} allowed` });
      }
    } catch (error) {
      console.log(error)
    }
  };
};

module.exports =  {
  protect,
  admin
}