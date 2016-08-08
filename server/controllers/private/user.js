var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');


var User = require('../../models/User');
var ControllerPrototype = require('../controller.prototype');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/users'
  });
  var router = controller.router;

  router.get('/:id', function(req, res) {
    User.findById(req.params.id)
    .then(function(user) {
      res.json(user);
    })
    .catch(function(error) {
      res.status(404).json(error);
    });
  });

  router.get('/:id/stats', function(req, res) {
    // DUMMY DATA REPLACE LATER
    res.send(
      JSON.stringify([
        {label: 'Weight', value: '180lbs'},
        {label: 'Bench', value: '5x180lbs'}
      ])
    );
  });

  router.get('/:id/goals', function(req, res) {
    // DUMMY DATA REPLACE LATER
    res.send(
      JSON.stringify([
        {label: 'Weight', value: '150lbs'},
        {label: 'Bench', value: '5x200lbs'}
      ])
    );
  });

  router.get('/:id/milestones', function(req, res) {
    // DUMMY DATA REPLACE LATER
    res.send(
      JSON.stringify([
        {label: 'Weight', value: '199lbs'},
        {label: 'Bench', value: '5x180lbs'}
      ])
    );
  });

  return controller;
})();
