var moment = require('moment');
var request = require('request');
var qs = require('querystring');

var ControllerPrototype = require('../controller.prototype');
var Regime = require('../../models/Regime');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/feed'
  });
  var router = controller.router;

  router.get('/', function(req,res){
    console.log("this is the req query params")
    console.log(req.query);
    res.send({data: "this is a string"});
  });

  return controller;
})()
