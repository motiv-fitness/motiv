var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');

var ControllerPrototype = require('../controller.prototype');
var Regime = require('../../models/Regime');
var Goal = require('../../models/Goal');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/goals'
  });
  var router = controller.router;

  router.get('/progress', function(req,res){
    //DUMMY DATA

    res.json([
      {
        name: 'benchPress',
        description: 'weightLift',
        type: 'exercise',
        target: 230,
        measurement: 'lbs',
        current: 170
      },
      {
        name: 'curls',
        description: 'weightLift',
        type: 'exercise',
        target: 75,
        measurement: 'lbs',
        current: 50
      },
      {
        name: 'jog',
        description: 'cardio',
        type: 'exercise',
        target: 75,
        measurement: 'mi',
        current: 24
      }
    ]);
    // res.json([
    //          { name: "Justin", image: "https://avatars1.githubusercontent.com/u/12463303?v=3&s=460", goals:{benchPress:275, currentBench:230, runPerMonth:50}},
    //          { name: "Denny", image: "https://avatars1.githubusercontent.com/u/2238156?v=3&s=40", goals:{benchPress:315, currentBench:275, runPerMonth:50}},
    //          { name: "Ariel", image: "https://avatars1.githubusercontent.com/u/16250211?v=3&u=69100363ede9ab6a3f86b2c48d23ac950bacbd8e&s=140", goals:{benchPress:215, currentBench:100, runPerMonth:50}},
    //          { name: "Jason", image: "", goals:{benchPress:200, currentBench:165, runPerMonth:100}}
    //   ])
  });

  return controller;
})()
