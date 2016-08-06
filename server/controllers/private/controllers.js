var account = require('./account');
var aws = require('./aws');

module.exports = (() => {
  let controllers = [
    account,
    aws
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();