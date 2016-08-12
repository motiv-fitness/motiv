var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('Goal', ModelBase.extend({
    tableName: 'goals',
    user: function() {
      return this.belongsTo('User', 'user_id');
    },
    progressName: function() {
      return this.hasOne('ProgressName');
    }
  }));
})();
