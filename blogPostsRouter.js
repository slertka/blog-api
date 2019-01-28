const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./model');

// add blog posts
BlogPosts.create("blog post 1", "test content", "slertka");
BlogPosts.create("blog post 2", "test content", "slertka");

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
})

router.post('/', jsonParser, (req, res) => {
  // Check 'title', 'content', and 'author' are in body of request
  const requiredFields = ["title", "content", "author"];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      console.error(message);
      res.status(400).send(message);
    }
  }

  const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  console.log("Created new blog post");
  res.status(201).json(post);
})

router.delete('/:id', jsonParser, (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post id ${req.params.id}`);
  res.status(204).end();
})

router.put('/:id', jsonParser, (req, res) => {
  // Check 'title', 'content', and 'author' are in body of request
  const requiredFields = ["title", "content", "author", "id"];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      console.error(message);
      res.status(400).send(message);
    }
  }

  // Check if request id matches body id
  if (req.body.id !== req.params.id) {
    const message = `Request path id ${req.params.id} must match the body id ${req.body.id}`;
    console.error(message);
    res.status(400).send(message);
  }

  console.log(`Updating blog post id ${req.params.id}`);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  })
  res.status(204).end;
})

module.exports = router;