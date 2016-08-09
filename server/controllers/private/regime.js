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
  router.put('/exercise', function(req,res){
    console.log('WE DOWN HERE EXERCISE',req.body);
    Regime.create({type:'exercise',label:req.body.name,name:req.body.label})
   .then(function(){
     console.log("column created");
   });


  })

  router.get('/exercise', function(req,res){
    Regime.fetchAll({
      columns: ['name', 'label', 'type']
    }).then(function(stuff){
      res.json(stuff.models)
    })
  });


    //DUMMY DATA
    // res.send(
    //   JSON.stringify([
    //     {name:'BENCHPRESS',exercise:'LIFTING'}
    //   ])
    // );
  router.put('/diet', function(req,res){
    console.log('WE DOWN HERE',req.body);
    res.end();
    Regime.create({type:'diet',label:req.body.label,name:req.body.name})
  })
  router.get('/diet', function(req,res){
    Regime.fetchAll({
      columns: ['name', 'label', 'type']
    }).then(function(stuff){
      res.json(stuff.models)
    })
  });

  return controller;
})()
