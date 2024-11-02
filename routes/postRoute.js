const express = require('express');
const { getPosts, addPost, scoreChange } = require('../controllers/postController');

const postsRouter = express.Router();

postsRouter.get('/posts', getPosts);                  // Fetch all posts
postsRouter.post('/posts', addPost);     
postsRouter.put('/posts', scoreChange);

module.exports = postsRouter;