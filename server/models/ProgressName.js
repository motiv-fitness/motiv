var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);
var Goal = require('./Goal');
var ProgressLog = require('./ProgressLog');

module.exports = bookshelf.model('ProgressName', (function() {
  return ModelBase.extend({
    tableName: 'progressNames',
    goal: function() {
      return this.belongsTo('Goal', 'goal_id');
    },
    progressLog: function() {
      return this.belongsTo('ProgressLog', 'progressLog_id');
    }
  });
})());
