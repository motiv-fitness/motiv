var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('ProgressReportImage', ModelBase.extend({
    tableName: 'progressReportImages',
    user: function() {
      return this.belongsTo('User', 'user_id');
    }
  }));
})();