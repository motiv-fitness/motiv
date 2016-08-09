var User = require('./User');
var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);


module.exports=(function() {
  return ModelBase.extend({
    tableName:'supplements',
    name:function(){
      return this.BelongsTo(name, 'user_id')
    },
    amount:function(){
      return this.BelongsTo(amount)
    }
  })
})()
