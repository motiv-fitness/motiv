var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);
var User = require('./User');
var ProgressLog = require('./ProgressLog');
var ProgressReportImage = require('./ProgressReportImage');

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'progressReports',
    user: function() {
      return this.belongsTo(User, 'user_id');
    },
    progressLogs: function() {
      return this.hasMany(ProgressLog)
    },
    progressReportImages: function() {
      return this.hasMany(ProgressReportImage);
    }
  });
})();