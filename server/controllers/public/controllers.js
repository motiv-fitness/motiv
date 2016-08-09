var auth = require('./auth');
var contact = require('./contact');
var login = require('./login');
var signup = require('./signup');
var user = require('./user');
var regime = require('./regime');
var feed = require('./feed');
var supplements = require('./supplement');

module.exports = (() => {
  let controllers = [
    auth,
    contact,
    login,
    signup,
    user,
    regime,
    feed,
    supplements
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();
