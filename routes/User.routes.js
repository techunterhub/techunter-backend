const express = require("express");
const router = express.Router();

const validateRequestWithSchema = require("../utility/customError");

const {
    Register,
    adminStatus,
    getUser,
    getUserById,
    login,
} = require("../controllers/user.controller");

const {
    admin,
    protect
} = require("../middlewares/auth.middlewares");
const User = require("../models/user.models");


router.route("/register").post(validateRequestWithSchema(User.schema),Register);

router.route("/login").post(login);

router.route("/profile").get(protect, admin(["admin", "superadmin"]), getUser);

router.route("/profile/:id").get(protect, admin(["admin", "superadmin"]), getUserById);


router.route("/change-status/:id").patch(protect, admin(["superadmin"]), adminStatus);

module.exports = router;