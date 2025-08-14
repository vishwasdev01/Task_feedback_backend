// controllers/postsController.js
let posts = require("../data/post");

// Get all posts (sorted by newest first)
exports.getPosts = (req, res) => {
  const sorted = [...posts].sort((a, b) => b.createdAt - a.createdAt);
  res.json(sorted);
};

// Create new post
exports.createPost = (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newPost = {
    id: Date.now(),
    text,
    likes: 0,
    dislikes: 0,
    comments: [],
    createdAt: new Date()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

// Like post
exports.likePost = (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id == id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.likes += 1;
  res.json(post);
};

// Dislike post
exports.dislikePost = (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id == id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.dislikes += 1;
  res.json(post);
};

// Add comment
exports.addComment = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const post = posts.find(p => p.id == id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.comments.push({ id: Date.now(), text });
  res.json(post);
};
