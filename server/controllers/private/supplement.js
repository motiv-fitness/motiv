var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var ControllerPrototype = require('../controller.prototype');
var Supplement = require('../../models/Supplement');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/supplements'
  });
  var router = controller.router;
  router.put('/', function(req,res){
    console.log('WE DOWN HERE',req.body.supplement);
    res.end();
    Supplement.findOne({supplement:req.body})
   .then(function(data){
     console.log(data,"this is the data from supplement");
   });

  })

  router.get('/', function(req,res){
    //DUMMY DATA
    res.send(
      JSON.stringify([
        {supplement:'preWorkout',amount:'5 scoops+3scoops'}
      ])
    );
  });
  return controller;
})()
