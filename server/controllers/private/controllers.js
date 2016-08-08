var account = require('./account');
var aws = require('./aws');
var goal = require('./goal');

module.exports = (() => {
  let controllers = [
    account,
    aws,
    goal
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();
