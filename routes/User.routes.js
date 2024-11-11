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

router.route("/login").post(validateRequestWithSchema(User.schema),login);

router.route("/profile").get(protect, admin(["admin", "superadmin"]),validateRequestWithSchema(User.schema), getUser);

router.route("/profile/:id").get(protect, admin(["admin", "superadmin"]),validateRequestWithSchema(User.schema), getUserById);


router.route("/change-status/:id").patch(protect, admin(["superadmin"]),validateRequestWithSchema(User.schema), adminStatus);

module.exports = router;