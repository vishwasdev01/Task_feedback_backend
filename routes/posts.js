// routes/posts.js
const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("/", postsController.getPosts);
router.post("/", postsController.createPost);
router.post("/:id/like", postsController.likePost);
router.post("/:id/dislike", postsController.dislikePost);
router.post("/:id/comment", postsController.addComment);

module.exports = router;
