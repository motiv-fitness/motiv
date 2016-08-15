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
    console.log("------inside post req.body.goal", req.body.goal)
    User.findOne({
      id: req.user.id
    }).then(function(user) {
      console.log("======req.body.goal.measurement", req.body.goal.measurement)
      return user.goals().create({
        target: req.body.goal.target,
        measurement: req.body.goal.measurementValue
      });
    }).then(function(goal) {
      console.log("=========== req.body.goal", req.body.goal)
      return ProgressName.create({
        type: req.body.goal.typeValue,
        name: req.body.goal.name,
        description: req.body.goal.description,
        goal_id: goal.id
      });
    }).then(function(progressName) {
      res.json('Successfully created goal');
    }).catch(function(error) {
      console.error(error);
      res.status(500).json(error);
    });
  });

  //GET THE GOOD VERSION
  console.log('========about to run get from back end')
  router.get('/', function(req, res) {
    Goal.fetchAll({
      user_id: req.user.id,
      withRelated:['progressName']
    }).then(function(goals) {
      console.log("---------backend: goals.models", goals.models)
      var data = _.map(goals.models, function(goal) {
        return {
          name: goal.relations.progressName.attributes.name,
          target: goal.attributes.target,
          measurement: goal.attributes.measurement
        };
      });
      console.log("-------------backend data", data)
      res.json(data);
    })
  });


// GET ALL DATA FROM PROGRESS NAME
  // router.get('/', function(req, res) {
  //   ProgressName.forge()
  //   .fetch()
  //   .then(function (collection) {
  //     console.log("==================collection", collection)
  //     res.json({error: false, data: collection.toJSON()});
  //   })
  //   .catch(function (err) {
  //     res.status(500).json({error: true, data: {message: err.message}});
  //   });
  // })


return controller;

})();
