var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('ProgressLog', ModelBase.extend({
    tableName: 'progressLogs',  
    progressReport: function() {
      return this.belongsTo('ProgressReport', 'progressReport_id');
    },
    progressName: function() {
      return this.hasOne('ProgressName');
    }
  },
  {
    dependents: ['progressName']
  }));
})();