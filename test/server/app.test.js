var request = require('supertest');
var server = require('../../server/server');

describe('check if pages render', function() {
  this.retries(5);
  
  describe('GET /', function() {
    it('should render ok', function(done) {
      request(server)
        .get('/')
        .expect(302, done);
    });
  });

  describe('GET /contact', function() {
    it('should render ok', function(done) {
      request(server)
        .get('/contact')
        .expect(200, done);
    });
  });

  describe('GET /login', function() {
    it('should render ok', function(done) {
      request(server)
        .get('/login')
        .expect(200, done);
    });
  });

  describe('GET /signup', function() {
    it('should render ok', function(done) {
      request(server)
        .get('/signup')
        .expect(200, done);
    });
  });

  // describe('GET /users/:id/stats', function() {
  //   it('should render ok', function(done) {
  //     request(server)
  //       .get('/users/1/stats')
  //       .expect(200, done);
  //   });
  // });

  // describe('GET /users/:id/goals', function() {
  //   it('should render ok', function(done) {
  //     request(server)
  //       .get('/users/1/goals')
  //       .expect(200, done);
  //   });
  // });

  // describe('GET /users/:id/milestones', function() {
  //   it('should render ok', function(done) {
  //     request(server)
  //       .get('/users/1/milestones')
  //       .expect(200, done);
  //   });
  // });
});