var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('Friend', ModelBase.extend({
    tableName: 'friends',
    user1: function() {
      return this.belongsTo('User', 'user_id1');
    },
    user2: function() {
      return this.belongsTo('User', 'user_id2');
    }
  }));
})();