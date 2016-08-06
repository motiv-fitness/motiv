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
    res.json({
      name: 'Justin',
      time: new Date(),
      content: 'this is some string'
    });
  });

  return controller;
})()
