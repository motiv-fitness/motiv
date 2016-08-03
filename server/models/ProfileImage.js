var bookshelf = require('../config/bookshelf');
var ProgressReport = require('./ProgressReport');

module.exports = (function() {
  return bookshelf.Model.extend({
    tableName: 'profileImages',
    user: function() {
      return this.belongsTo(ProgressReport);
    },
    hasTimestamps: true
  });
})();