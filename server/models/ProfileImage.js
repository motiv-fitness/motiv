var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);
var ProgressReport = require('./ProgressReport');

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'profileImages',
    user: function() {
      return this.belongsTo(ProgressReport);
    }
  });
})();