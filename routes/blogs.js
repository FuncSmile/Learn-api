const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

// Create blog
router.post("/", auth, async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, user: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Admin approves blog
router.put("/:id/approve", auth, isAdmin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.isApproved = true;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
