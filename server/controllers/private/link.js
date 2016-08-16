var ControllerPrototype = require('../controller.prototype');
var User = require('../../models/User');
var ProgressLog = require('../../models/ProgressLog');
var ProgressName = require('../../models/ProgressName');
var ProgressReportImage = require('../../models/ProgressReportImage');
var ProgressReport = require('../../models/ProgressReport');


module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/api/links'
  });
  var router = controller.router;

  router.post('/progress-video', function(req, res) {
    ProgressReport.create({
        date: req.body.progress.dateTime,
        weight: req.body.progress.weight,
        user_id: req.user.id
    }).then(function(progressReport) {
      return ProgressReportImage.create({
        url: req.body.progress.link,
        progressReport_id: progressReport.id,
        contentType: 'video'
      }).then(function() {
        return progressReport;
      });
    }).then(function(progressReport) {
      return ProgressLog.create({
        current: req.body.progress.current,
        measurement: req.body.progress.measurement,
        progressReport_id: progressReport.id
      });
    }).then(function(progressLog) {
      return ProgressName.create({
        type: req.body.progress.progressType,
        name: req.body.progress.name,
        description: req.body.progress.description,
        progressLog_id: progressLog.id
      });
    }).then(function() {
      res.json('Successfully saved link');
    });
  });

  router.post('/progress-image', function(req, res) {
    console.log(req.body.progress.contentType);
    ProgressReport.create({
        date: req.body.progress.dateTime,
        weight: req.body.progress.weight,
        user_id: req.user.id
    }).then(function(progressReport) {
      return ProgressReportImage.create({
        url: req.body.progress.link,
        progressReport_id: progressReport.id,
        contentType: req.body.progress.contentType,
        originalName: req.body.progress.originalName
      }).then(function() {
        return progressReport;
      });
    }).then(function(progressReport) {
      return ProgressLog.create({
        current: req.body.progress.current,
        measurement: req.body.progress.measurement,
        progressReport_id: progressReport.id
      });
    }).then(function(progressLog) {
      return ProgressName.create({
        type: req.body.progress.progressType,
        name: req.body.progress.name,
        description: req.body.progress.description,
        progressLog_id: progressLog.id
      });
    }).then(function() {
      res.json('Successfully saved link');
    });
  });

  return controller;
})();