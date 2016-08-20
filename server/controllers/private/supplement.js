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
  router.post('/', function(req,res){
    Supplement.create({name:req.body.supplement,amount:req.body.amount,user_id:req.user.id})
    res.json('done');
  })

  router.put('/', function(req,res){
     Supplement.findOne({id:req.body.id},{require:true})
    .then(function(data){
      Supplement.update({name:req.body.supplement,amount:req.body.amount},{id:data.id})
    })
    res.json('done');
  })

  router.delete('/',function(req,res){
    Supplement.findOne({id:req.body.id},{require: true })
    .then(function(found){
        return Supplement.destroy({id:found.id})
    })
    .then(function(){
      res.json('done');
    })

  });

  router.get('/', function(req,res){
    Supplement.fetchAll({
      user_id: req.user.id
    },{
      columns: ['name', 'amount','id']
    }).then(function(stuff){
      res.json(stuff.models);
    })
  });



  return controller;
})()
