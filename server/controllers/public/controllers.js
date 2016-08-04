var auth = require('./auth');
var contact = require('./contact');
var login = require('./login');
var signup = require('./signup');
var user = require('./user');
var regime = require('./regime');

module.exports = (() => {
  let controllers = [
    auth,
    contact,
    login,
    signup,
    user,
    regime
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();
