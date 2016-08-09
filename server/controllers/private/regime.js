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
    Regime.create({type:'exercise',label:req.body.name,name:req.body.exercise})
   .then(function(){
     console.log("column created");
   });


  })

  router.get('/exercise', function(req,res){
    Regime.fetchAll().then(function(stuff){
       var all = _.each(stuff.models,function(a){
        return a.attributes;
      })
      res.json(all)

    })
    //DUMMY DATA
    // res.send(
    //   JSON.stringify([
    //     {name:'BENCHPRESS',exercise:'LIFTING'}
    //   ])
    // );
  });
  router.put('/diet', function(req,res){
    console.log('WE DOWN HERE',req.body);
    res.end();
    Regime.create({type:'diet',label:req.body.diet,name:req.body.food})
  })
  router.get('/diet', function(req,res){
    //Dummy DATA
    res.send(
      JSON.stringify([
        {diet:'CHEATDAY', food:'CHICKENNUGGZZ'}
      ])
    );
  });
  return controller;
})()
