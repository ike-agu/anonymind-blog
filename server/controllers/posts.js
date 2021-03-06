const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.all;
    res.json({ posts });
  } catch (error) {
    res.json({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.json(newPost);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
