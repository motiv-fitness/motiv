var bookshelf = require('../config/bookshelf');
var User = require('./User');

module.exports = (function() {
  return bookshelf.Model.extend({
    tableName: 'progressReportImages',
    user: function() {
      return this.belongsTo(User);
    },
    hasTimestamps: true
  });
})();