var bookshelf = require('../config/bookshelf');

module.exports = (function() {
  return bookshelf.Model.extend({
    tableName: 'friends',
    hasTimestamps: true
  });
})();