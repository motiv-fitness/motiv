var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('ProgressReport', ModelBase.extend({
    tableName: 'progressReports',
    user: function() {
      return this.belongsTo('User', 'user_id');
    },
    progressLogs: function() {
      return this.hasMany('ProgressLog')
    },
    progressReportImages: function() {
      return this.hasMany('ProgressReportImage');
    }
  },
  {
    dependents: ['progressLogs', 'progressReportImages']
  }));
})();