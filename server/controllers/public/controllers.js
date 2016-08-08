var auth = require('./auth');
var contact = require('./contact');
var login = require('./login');
var signup = require('./signup');

module.exports = (() => {
  let controllers = [
    auth,
    contact,
    login,
    signup
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();
