var ControllerPrototype = require('../controller.prototype');
var ProgressReportImage = require('../../models/ProgressReportImage');
var User = require('../../models/User');
var AWS = require('aws-sdk');
var uuid = require('uuid');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/api/aws'
  });
  var router = controller.router;
  var baseUrl = 'https://s3-' + process.env.AWS_REGION
    + '.amazonaws.com/' + process.env.AWS_S3_BUCKET + '/';

  router.get('/s3/sign', function(req, res) {
    var key = req.query.contentType + '/' + uuid.v1(); + uuid.v4();
    var url = new AWS.S3().getSignedUrl('putObject', {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Expires: 60,
      ContentType: req.query.contentType
    });
    res.json({ 
      signedUrl: url,
      imgInfo: {
        originalName: req.query.objectName,
        contentType: req.query.contentType,
        url: baseUrl + key
      } 
    });
  });

  return controller;
})();
