const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Posts', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  // ----- GET TEST STRATEGY ------
  // 1. verify response is successful (status 200)
  // 2. verify response is an array
  // 3. verify response is json
  // 4. verify blog post is an object
  // 5. verify blog post has keys 'title', 'content', 'author', 'id', and 'publish date'
  it('should display blogs on GET', function() {
    return chai
      .request(app)
      .get('/blog-posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res).to.be.json;

        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys('title', 'content', 'author', 'id', 'publishDate');
        })
      })
  })

  // ------ POST TEST STRATEGY -----
  // 1. create new blog post entry with required fields title, content, author
  // 2. verify response has a status of 201
  // 3. verify response is json
  // 4. verify blog post is an object
  // 5. verify blog post has the keys 'title', 'content', 'author', 'id', 'publishDate'
  // 6. verify blog post id and publishDate is not null
  // 7. verify neew blog post has correct content
  it('should create new blog post on POST', function() {
    const newPost = {
      title: "new blog post",
      content: "new blog content",
      author: "new blog author"
    }
    return chai
      .request(app)
      .post('/blog-posts')
      .send(newPost)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('title', 'content', 'author', 'id', 'publishDate');
        expect(res.body.id).to.not.equal(null);
        expect(res.body.publishDate).to.not.equal(null);
        expect(res.body).to.deep.equal(Object.assign(newPost, {id: res.body.id, publishDate: res.body.publishDate}));
      })
  })
})