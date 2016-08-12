var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('Regime', ModelBase.extend({
    tableName: 'regimes',
    user: function() {
      return this.belongsTo('User', 'user_id');
    },
  }));
})();
