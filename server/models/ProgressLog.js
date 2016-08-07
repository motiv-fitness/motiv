var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);
var ProgressReport = require('./ProgressReport');
var ProgressName = require('./ProgressName');

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'progressLogs',  
    progressReport: function() {
      return this.belongsTo(ProgressReport, 'progressReport_id');
    },
    progressNames: function() {
      return this.hasMany(ProgressName);
    }
  });
})();