var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

var ControllerPrototype = require('../controller.prototype');
var Regime = require('../../models/Regime');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/regimes'
  });
  var router = controller.router;
  router.post('/exercise', function(req,res){
    Regime.create({type:'exercise',label:req.body.name,name:req.body.label,user_id:req.user.id})
  })

  router.put('/exercise', function(req,res){
    console.log(req.body,'we are in the diet controller')
    Regime.findOne({id:req.body.id},{require: true})
    .then(function(data){
      Regime.update({type:'exercise',label:req.body.label,name:req.body.name},{id:data.id});
    })
  })

  router.delete('/exercise',function(req,res){
    Regime.findOne({id:req.body.id},{require: true })
    .then(function(found){
      Regime.destroy({id:found.id})
    })
  });

  router.get('/exercise', function(req,res){
    Regime.fetchAll({user_id:req.user.id},
      {
      columns: ['name', 'label', 'type','id']
    }).then(function(stuff){
      res.json(stuff.models)
    })
  });

  router.delete('/diet',function(req,res){
    Regime.findOne({id:req.body.id},{require: true })
    .then(function(found){
      Regime.destroy({id:found.id})
    })
  });


  router.post('/diet', function(req,res){
    Regime.create({type:'diet',label:req.body.label,name:req.body.name,user_id:req.user.id})
  })

  router.put('/diet', function(req,res){
    console.log(req.body,'we are in the diet controller')
    Regime.findOne({id:req.body.id},{require: true})
    .then(function(data){
      Regime.update({type:'diet',label:req.body.label,name:req.body.name},{id:data.id});
    })
  })


  router.get('/diet', function(req,res){
    Regime.fetchAll({user_id:req.user.id},{
      columns: ['name', 'label', 'type','id']
    }).then(function(stuff){
      res.json(stuff.models)
    })
  });

  return controller;
})()
