var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');

var ControllerPrototype = require('../controller.prototype');
var Resource = require('../../models/FavResource');


module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/resource'
  });
  var router = controller.router;

  router.get('/recipe', function(req,res){   // how about articles,
    //DUMMY DATA
// recipe, videos, article
    res.json([
             { type: "Video-workout", url: "https://youtu.be/vB9NIm0SZRg" },
             { type: "Article-workout", url: "http://www.muscleandfitness.com/workouts/workout-routines/complete-mf-beginners-training-guide-0" },
             { type: "Recipe", url: "http://www.health.com/health/gallery/0,,20855303,00.html" },
             { type: "Article", url: "http://www.medicalnewstoday.com/articles/149636.php" }
      ])
  });

  return controller;
})()
