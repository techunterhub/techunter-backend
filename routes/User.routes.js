const express = require("express");
const router = express.Router();

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


router.route("/register").post(Register);

router.route("/login").post(login);

router.route("/profile").get(protect, admin(["admin", "superadmin"]), getUser);

router.route("/profile/:id").get(protect, admin(["admin", "superadmin"]), getUserById);


router.route("/change-status/:id").patch(protect, admin(["superadmin"]), adminStatus);

module.exports = router;