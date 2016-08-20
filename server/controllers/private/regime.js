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
    res.json('done');
  })

  router.put('/exercise', function(req,res){
    Regime.findOne({id:req.body.id},{require: true})
    .then(function(data){
      Regime.update({type:'exercise',label:req.body.label,name:req.body.name},{id:data.id});
    })
    res.json('done');
  })

  router.delete('/exercise',function(req,res){
    Regime.findOne({id:req.body.id},{require: true })
    .then(function(found){
    return  Regime.destroy({id:found.id})
    })
    .then(function(){
      res.json('yup');
    })
  });

  router.get('/exercise', function(req,res){
    Regime.findAll({type:'exercise',user_id:req.user.id},
      {
      columns: ['name', 'label', 'type','id']
    }).then(function(stuff){
      res.json(stuff.models);
    })
  });

  router.delete('/diet',function(req,res){
    Regime.findOne({id:req.body.id},{require: true })
    .then(function(found){
      return Regime.destroy({id:found.id});
    })
    .then(function(){
      res.json('yup');
    })
  });


  router.post('/diet', function(req,res){
    Regime.create({type:'diet',label:req.body.name,name:req.body.label,user_id:req.user.id})
    res.json('done');
  })

  router.put('/diet', function(req,res){
    Regime.findOne({id:req.body.id},{require: true})
    .then(function(data){
      Regime.update({type:'diet',label:req.body.label,name:req.body.name},{id:data.id});
    })
    res.json('done ');
  })


  router.get('/diet', function(req,res){
    Regime.findAll({type:'diet',user_id:req.user.id},{
      columns: ['name', 'label', 'type','id']
    }).then(function(stuff){
      res.json(stuff.models);
    })
  });

  return controller;
})()
