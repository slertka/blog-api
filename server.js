const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

const {BlogPosts} = require('./model');

// log to the http layer
app.use(morgan('common'));

// add blog posts
BlogPosts.create("blog post 1", "test content", "slertka");
BlogPosts.create("blog post 2", "test content", "slertka");

app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
})

app.post('/blog-posts', jsonParser, (req, res) => {
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

  // create new blog post
  const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(post);
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});