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

  router.put('/', function(req, res) {
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
      console.log("---------backend: goals.models", goals.models)
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
