var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');

var ControllerPrototype = require('../controller.prototype');
var Regime = require('../../models/Regime');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/regimes'
  });
  var router = controller.router;
  router.put('/exercise', function(req,res){
    console.log('WE DOWN HERE EXERCISE',req.body);
    res.end();
  })

  router.get('/exercise', function(req,res){
    //DUMMY DATA
    res.send(
      JSON.stringify([
        {name:'BENCHPRESS',exercise:'LIFTING'}
      ])
    );
  });
  router.put('/diet', function(req,res){
    console.log('WE DOWN HERE',req.body);
    res.end();
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
