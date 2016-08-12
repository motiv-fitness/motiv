var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);


module.exports=(function() {
  return bookshelf.model('Supplement', ModelBase.extend({
    tableName:'supplements',
    user: function() {
      return this.belongsTo('User', 'user_id')
    }
  }));
})()
