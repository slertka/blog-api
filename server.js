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

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});