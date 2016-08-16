var moment = require('moment');
var request = require('request');
var qs = require('querystring');

var Friends = require('../../models/Friend');
var ControllerPrototype = require('../controller.prototype');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/friends'
  });
  var router = controller.router;

  router.get('/check', function(req,res){
    console.log("inside /check", req.query)
    var id1 = req.query.curr;
    var id2 = req.query.otherID;
    
    Friends.findOne({user_id1:id1})
    .then(function(friend) {
      res.json(friend);
    })
    .catch(function(error) {
      res.status(404).json(error);
    });

    // Friends.findOne({user_id1:id1, user_id2:id2})
    //   .then(function(row) {
    //     console.log("returned from findone", row);

    //   });
    // res.json({message:"received get at /api/friends/check"});
  });

  //gets all friends of a user
  router.get('/', function(req, res) {
    var user = req.query.userID;
    Friends.query({where: {user_id1: user}, orWhere: {'user_id2': user}})
      .fetchAll()
      .then(function(results) {
        console.log("these are the results of the log", results
          )

        res.json(results);
      })

  });

  //creates new friendship
  router.post('/', function(req, res) {

  });

  //unfriends a user
  router.delete('/', function(req, res) {

  })


  return controller;
})()
