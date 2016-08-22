var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

var ControllerPrototype = require('../controller.prototype');
var Event = require('../../models/Event');
var Friend = require('../../models/Friend');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/feed'
  });
  var router = controller.router;
  var pageLimit = 10;
  var cache = {};

  function buildFriendsQuery(userId, friends) {
    var list = [];
    _.each(friends, function(friend) {
      var queryStr = list.length === 0
        ? 'where'
        : 'orWhere';
      var obj = {};
      obj[queryStr] = {
        user_id: userId === friend.attributes.user_id2
          ? friend.attributes.user_id1
          : friend.attributes.user_id2
      };
      list.push(obj);
    });

    var result = {};
    _.each(list, function(queryStr) {
      result = Object.assign(result, queryStr);
    });

    return result;
  }

  router.get('/:userId', function(req,res) {
    Friend.query({
      where: {
        user_id1: req.user.id
      },
      orWhere: {
        user_id2: req.user.id
      }
    })
    .fetchAll()
    .then(function(results) {
      if(results.models.length === 0) {
        return results;
      }
      return Event.query(buildFriendsQuery(req.user.id, results.models))
        .fetchAll();
    })
    .then(function(events) {
      var data = events.models.sort(function(a, b) {
        return b.attributes.created_at.getTime() - a.attributes.created_at.getTime();
      })
      cache[req.params.userId] = {
        page: 1,
        data: data
      };
      // res.json(cache[req.params.userId].data.slice(0, pageLimit));
      res.json(data);
    }).catch(function(error) {
      res.status(500).json(error);
    });

  });router = controller.router;

  router.get('/next/:userId', function(req,res){
    var feeds = cache[req.params.id];
    if(feeds) {
      if(feeds.page * pageLimit < feeds.data.length) {
        feeds.page = feeds.page + 1;
        return res.json(feeds.data.slice(feeds.page - 1, feeds.page));
      }
    }
    res.json([]);
  });

  return controller;
})()
