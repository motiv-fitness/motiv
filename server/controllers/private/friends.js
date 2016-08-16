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
    var id1 = req.query.curr,
        id2 = req.query.otherID;

    //id1 always lowest

    Friends.findOne({
      user_id1: Math.min(id1,id2), 
      user_id2: Math.max(id1,id2)
    })
    .then(function(friend) {
      var respObj = {
        isFriend: true,
        data: friend
      }
      res.send(respObj);
    })
    //could not find
    .catch(function(error) {
      var respObj = {
        isFriend: false,
        data: error
      }
      res.send(respObj);
    });

  });

  //gets all friends of a user
  router.get('/', function(req, res) {
    var user = req.query.userID;
    Friends.query({where: {user_id1: user}, orWhere: {'user_id2': user}})
      .fetchAll()
      .then(function(results) {
        console.log("these are the results of the log", results);

        res.json(results);
      })

  });

  //creates new friendship
  router.post('/', function(req, res) {
    var id1 = req.body.id1,
        id2 = req.body.id2;

    new Friends({
      user_id1: Math.min(id1,id2),
      user_id2: Math.max(id1,id2)
    })
      .save()
      .then(function(friend) {
        res.send({
          friendship:friend
        })
      })

  });

  //unfriends a user
  router.delete('/', function(req, res) {


  })


  return controller;
})()
