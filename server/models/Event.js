var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('Event', ModelBase.extend({
    tableName: 'events',
    user: function() {
      return this.belongsTo('User', 'user_id');
    }
  }));
})();