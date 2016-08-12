var ControllerPrototype = require('../controller.prototype');
var User = require('../../models/User');


module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/api/links'
  });
  var router = controller.router;

  router.post('/progress-video', function(req, res) {
    // Need to implement progress reports
    res.json('Successfully saved link');
  });

  return controller;
})();