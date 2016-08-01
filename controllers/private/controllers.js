var account = require('./account');

module.exports = (() => {
  let controllers = [
    account
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();