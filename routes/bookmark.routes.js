const express = require("express");
const router = express.Router();

const {
   getBookmarks,
   getBookmarksByUser,
   createBookMark,
   editBookmark,
   deleteBookmark,
   searchBookmark
} = require("../controllers/bookmark.controller");

router.route("/").get(getBookmarks);

router.route("/user/:user").get(getBookmarksByUser);

router.route("/create").post(createBookMark);

router.route("/edit/:id").patch(editBookmark);

router.route("/delete/:id").delete(deleteBookmark);

router.route("/search").get(searchBookmark);

module.exports = router;


