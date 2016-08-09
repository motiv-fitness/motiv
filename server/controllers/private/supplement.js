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

  console.log('inside the private supplements')
  var router = controller.router;
  router.put('/', function(req,res){
    console.log('WE DOWN HERE',req.body.supplement);
    return Supplement.findOne({id:1})
   .then(function(data){
     console.log(req.body.supplement,"this is the supplement from inside the data");
     return Supplement.update({name:req.body.supplement,amount:req.body.amount},{id:data.id});
     console.log(name.id,"this is the data from supplement");
    req.json(data)
  }).catch(function(err){
     console.log(err,'error from supplement put')
   });

  })


  router.get('/', function(req,res){
    //DUMMY DATA
    res.send(
      JSON.stringify([
        {supplement:'preWorkout',amount:'5 scoops+3scoops'}
      ])
    ).then(function(){
      console.log(Supplement.findAll());
    });
  });
  return controller;
})()
