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
    return Supplement.create({name:req.body.supplement,amount:req.body.amount,id:1})
   .then(function(data){
     return Supplement.update({name:req.body.supplement,amount:req.body.amount},{id:data.id});
    req.json(data)
  }).catch(function(err){
   });
  })


  router.get('/', function(req,res){
    Supplement.fetchAll({
      columns: ['name', 'amount']
    }).then(function(stuff){
      res.json(stuff.models)
    })
  });
  return controller;
})()
