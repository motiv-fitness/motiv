var User = require('./User');
var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);


module.exports=(function() {
  return ModelBase.extend({
    tableName:'supplements',
    supplement:function(){
      return this.BelongsTo(supplement)
    },
    amount:function(){
      return this.BelongsTo(amount)
    }
  })
})()
