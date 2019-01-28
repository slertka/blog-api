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
  // 5. verify blog post has keys 'name', 'content', 'author', 'id', and 'publish date'
  it('should display blogs on GET', function() {
    return chai
      .request(app)
      .get('/blog-posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        // expect(res).to.be.a('array');
        expect(res).to.be.json;

        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys('title', 'content', 'author', 'id', 'publishDate');
        })
      })
  })
})