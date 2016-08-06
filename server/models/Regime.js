var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);
var User = require('./User');

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'regimes',
    user: function() {
      return this.belongsTo(User);
    }
  });
})();