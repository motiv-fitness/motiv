var async = require('async');
var crpto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('request');
var request = require('request');
var qs = require('querystring');
var ControllerPrototype = require('../controller.prototype');
var Goal = require('../../models/Goal');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/api/goal'
  });

  var router = controller.router;

  router.put('/', function(req, res) {
    console.log("inside api goal put");
    return Goal.create({target:req.body.benchGoal}) // create a new instance of the Goal model
    .then(function(data) {
      return Goal.update({target:req.body.benchGoal}, {id:data.id})
      req.json(data)

    })
  });

  router.get('/', function(req, res) {
    Goal.fetchAll({     // fetch all entries in the db table
      columns: ['target', 'id']  // ???
    }).then(function(data) {
      res.json(data.models)  //data.attributes ???
    })
  });

  router.post('/'), function(req, res) {
    console.log("receiving post request at /api/goal/")
    console.log("REQ DAT BODY", req.body)
  }

return controller;

})();
