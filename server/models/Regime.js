var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);
var User = require('./User');

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'regimes',
    diet: function() {
      return this.belongsTo(diet);
    },
    food: function(){
      return this.belongsTo(food)
    }
  });
})();
