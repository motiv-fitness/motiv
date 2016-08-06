var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);
var User = require('./User');

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'progressReports',
    user: function() {
      return this.belongsTo(User);
    },
    hasTimestamps: true
  });
})();