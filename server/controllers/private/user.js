var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

var ProgressReport = require('../../models/ProgressReport');
var User = require('../../models/User');
var ControllerPrototype = require('../controller.prototype');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/users'
  });
  var router = controller.router;
  var cache = {};
  var pageLimit = 5;

  router.get('/url/:url', function(req, res) {
    new User({
      url: req.params.url
    })
    .fetch({
      withRelated: ['goals.progressName']
    })
    .then(function(user) {
      // user.goals = _.map(user.relations.goals.models, function(goal) {
      //   return {

      //   };
      // });

      res.json(user);
    })
    .catch(function(error) {
      res.status(404).json(error);
    });
  });

  router.get('/:id/timeline/:page', function(req, res) {
    if(Number(req.params.page) !== -1 && cache.hasOwnProperty(req.params.id)) {
      var page = Number(req.params.page);
      var start = page * pageLimit;
      if(start >= cache[req.params.id].length) {
        return res.json({
          page: page,
          next: page,
          data: []
        });
      }
      return res.json({
        page: page,
        next: page + 1,
        data: cache[req.params.id].slice(start, start + pageLimit)
      });
    }

    ProgressReport.query(function(qb){
      qb.orderBy('date','DESC'); 
    }).fetchAll({
      withRelated: ['progressReportImages', 'progressLogs.progressName']
    }).then(function(progressReports) {
      return _.map(
        _.filter(progressReports.models, function(progressReport) {
          return progressReport.attributes.user_id === Number(req.params.id);
        }), function(progressReport) {
          var progressLog = progressReport.relations.progressLogs.models[0];
          var progressName = progressLog.relations.progressName;
          var progressReportImage = progressReport.relations.progressReportImages.models[0];
          var link = progressReportImage.attributes.url;
          var index = link.indexOf('upload/') + 7;
          var resampledLink = link.substring(0, index)
            + '/c_scale,w_400/' + link.substring(index); 
          return {
            contentType: progressReportImage.attributes.contentType,
            link: progressReportImage.attributes.url,
            dateTime: progressReport.attributes.date,
            weight: progressReport.attributes.weight,
            current: progressLog.attributes.current,
            name: progressName.attributes.name,
            description: progressName.attributes.description,
            measurement: progressLog.attributes.measurement,
            progressType: progressName.attributes.type
          };
        });
    }).then(function(progressReports) {
      cache[req.params.id] = progressReports;
      res.json({
        page: 0,
        next: 1,
        data: progressReports.slice(0, pageLimit)
      });
    }).catch(function(error) {
      res.status(500).json(error);
    });
  });

  return controller;
})();
