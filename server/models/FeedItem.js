var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'feedItems',
    user: function() {
      return this.belongsTo(User, 'user_id');
    }
  });
})();