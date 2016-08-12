var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('Friend', ModelBase.extend({
    tableName: 'friends',
    user: function() {
      return this.belongsTo('User', 'user_id');
    }

  }));
})();