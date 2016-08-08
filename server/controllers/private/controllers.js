var account = require('./account');
var aws = require('./aws');
var goal = require('./goal');
var user = require('./user');
var regime = require('./regime');
var supplement = require('./supplement');
var feed = require('./feed');

module.exports = (() => {
  let controllers = [
    account,
    aws,
    goal,
    user,
    regime,
    supplement,
    feed
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();
