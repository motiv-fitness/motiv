var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('ProgressName', ModelBase.extend({
    tableName: 'progressNames',
    goal: function() {
      return this.belongsTo('Goal', 'goal_id');
    },
    progressLog: function() {
      return this.belongsTo('ProgressLog', 'progressLog_id');
    }
  }));
})();
