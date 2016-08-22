var ControllerPrototype = require('../controller.prototype');
var Goal = require('../../models/Goal');
var User = require('../../models/User');
var ProgressName = require('../../models/ProgressName');
var ProgressLog = require('../../models/ProgressLog');
var _ = require('lodash');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/api/goal'
  });

var router = controller.router;

router.post('/', function(req, res) {
    User.findOne({
      id: req.user.id
    }).then(function(user) {
      return user.goals().create({
        target: req.body.goalAdd.target,
        measurement: req.body.goalAdd.measurementValue
      });
    }).then(function(goal) {
      return ProgressName.create({
        type: req.body.goalAdd.typeValue,
        name: req.body.goalAdd.name,
        description: req.body.goalAdd.description,
        goal_id: goal.attributes.id  //req.body.goalAdd.goalId   // ????should be goal_id: req.body.goalAdd.???????
      });
    }).then(function(progressName) {
      res.json('Successfully created goal');
    }).catch(function(error) {
      console.error(error);
      res.status(500).json(error);
    });
  });

  router.put('/', function(req, res) {
    Goal.findOne({
      id: req.body.goal.goalId,
    })
    .then(function(data) {
      return Goal.update({
        target: req.body.goal.target,
        measurement: req.body.goal.measurementValue
      }, {
        id: req.body.goal.goalId
      });
    })
    .then(function(data) {
      return ProgressName.findOne({
        goal_id: req.body.goal.goalId
      })
      .then(function(progName) {
        return progName.save({
          name: req.body.goal.name,
          description: req.body.goal.description,
          type: req.body.goal.typeValue
        }, {
          goal_id: req.body.goal.goalId
        }); //id is the primary key
      });
    })
    .then(function() {
      res.json('Successfully updated goal');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  })

  router.delete('/', function(req, res) {
    Goal.findOne({
      id: req.body.goalId
    })
    .then(function(goal) {
      return goal.destroy();
    })
    .then(function() {
      res.json('Successfully deleted goal');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  })

 router.get('/:userId', function(req, res) {
    Goal.fetchAll({
      withRelated:['progressName']
    }).then(function(goals) {
      var data = _.filter(goals.models, function(goal) {
        return goal.attributes.user_id === Number(req.params.userId);
      });
      data = _.map(data, function(goal) {
        if(goal.relations.progressName.attributes.progressLog_id) {
          return ProgressLog.findOne({
            id: goal.relations.progressName.attributes.progressLog_id
          }).then(function(progressLog) {
            return {
              target: goal.attributes.target,
              measurement: goal.attributes.measurement,
              name: goal.relations.progressName.attributes.name,
              description: goal.relations.progressName.attributes.description,
              type: goal.relations.progressName.attributes.type,
              current: progressLog.attributes.current,
              goal_id: goal.id
            };
          });
        } else {
          return {
            target: goal.attributes.target,
            measurement: goal.attributes.measurement,
            name: goal.relations.progressName.attributes.name,
            description: goal.relations.progressName.attributes.description,
            type: goal.relations.progressName.attributes.type,
            current: 0,
            goal_id: goal.id
          };
        }
      });
      return Promise.all(data)
      .then(function(results) {
        res.json(results);
      });
    });
 });


return controller;

})();
