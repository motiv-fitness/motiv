var ControllerPrototype = require('../controller.prototype');
var Goal = require('../../models/Goal');
var User = require('../../models/User');
var ProgressName = require('../../models/ProgressName');
var ProgressLogs = require('../../models/ProgressLog');
var _ = require('lodash');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/api/goal'
  });

var router = controller.router;

  // POST
  router.post('/', function(req, res) {
    User.findOne({
      id: req.user.id
    }).then(function(user) {
      return user.goals().create({
        target: req.body.goal.target,
        measurement: 'lbs'
      });
    }).then(function(goal) {
      return ProgressName.create({
        type: 'exercise',
        name: req.body.goal.name,
        description: 'weightlifting',
        goal_id: goal.id
      });
    }).then(function(progressName) {
      res.json('Successfully created goal');
    }).catch(function(error) {
      console.error(error);
      res.status(500).json(error);
    });
  });

  //GET
  router.get('/', function(req, res) {
    Goal.fetchAll({
      user_id: req.user.id,
      withRelated:['progressName']
    }).then(function(goals) {
      var data = _.map(goals.models, function(goal) {
        return {
          name: goal.relations.progressName.attributes.name,
          target: goal.attributes.target,
          measurement: goal.attributes.measurement
        };
      });
      res.json(data);
    })
  });

return controller;

})();
