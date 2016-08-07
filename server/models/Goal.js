var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

var User = require('./User');
var ProgressName = require('./ProgressName');

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'goals',
    user: function() {
      return this.belongsTo(User, 'user_id');
    },
    progressName: function() {
      return this.hasOne(ProgressName);
    }
  });
})();