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
    console.log("------inside post req.body.goalAdd", req.body.goalAdd) // should be goalAdd
    User.findOne({
      id: req.user.id
    }).then(function(user) {
      return user.goals().create({
        target: req.body.goalAdd.target,
        measurement: req.body.goalAdd.measurementValue
      });
    }).then(function(goal) {
      console.log("===========line 46 what is goal.attributes:", goal.attributes)
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
    console.log("============doing a put: ", req.body.goalUpdate)
    Goal.findOne({
      id: req.body.goalUpdate.goalId,
    })
    .then(function(data) {
      Goal.update({target: req.body.goalUpdate.target,
        measurement: req.body.goalUpdate.measurementValue, }, {id: req.body.goalUpdate.goalId})
    })
    .then(function(data) {
      ProgressName.findOne({
        goal_id: req.body.goalUpdate.goalId
      })
      .then(function(progName) {
        progName.save({name: req.body.goalUpdate.name,
              description: req.body.goalUpdate.description,
              type: req.body.goalUpdate.typeValue}, {goal_id: req.body.goalUpdate.goalId}) //id is the primary key
        })
      })
    })

  router.delete('/', function(req, res) {
    console.log("============doing a delete: ", req.body.goalDelete)
    Goal.findOne({
      id: req.body.goalDelete.goalId
    })
    .then(function(goal) {
      goal.destroy()
    })
    .then(function(goal) {
      ProgressName.findOne(function(data) {
        goal_id: req.body.goalDelete.goalId
      })
      .then(function(progName) {
        progName.destroy()
        })
    })
  })

 router.get('/', function(req, res) {
    Goal.fetchAll({
      user_id: req.user.id,
      withRelated:['progressName']
    }).then(function(goals) {
      var data = _.map(goals.models, function(goal) {
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
