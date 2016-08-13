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

  router.get('/:id', function(req, res) {
    User.findById(req.params.id)
    .then(function(user) {
      res.json(user);
    })
    .catch(function(error) {
      res.status(404).json(error);
    });
  });

  router.get('/:id/stats', function(req, res) {
    // DUMMY DATA REPLACE LATER
    res.send(
      JSON.stringify([
        {label: 'Weight', value: '180lbs'},
        {label: 'Bench', value: '5x180lbs'}
      ])
    );
  });

  router.get('/:id/goals', function(req, res) {
    // DUMMY DATA REPLACE LATER
    res.send(
      JSON.stringify([
        {label: 'Weight', value: '150lbs'},
        {label: 'Bench', value: '5x200lbs'}
      ])
    );
  });

  router.get('/:id/milestones', function(req, res) {
    // DUMMY DATA REPLACE LATER
    res.send(
      JSON.stringify([
        {label: 'Weight', value: '199lbs'},
        {label: 'Bench', value: '5x180lbs'}
      ])
    );
  });

  router.get('/:id/timeline', function(req, res) {
    ProgressReport.fetchAll({
      user_id: req.params.id,
      withRelated: ['progressReportImages', 'progressLogs.progressNames']
    }).then(function(progressReports) {
      return _.map(progressReports.models, function(progressReport) {
        var progressLog = progressReport.relations.progressLogs.models[0];
        var progressName = progressLog.relations.progressNames.models[0];
        var progressReportImage = progressReport.relations.progressReportImages.models[0];
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
      res.json(progressReports);
    });
  });

  return controller;
})();
