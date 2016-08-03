var bookshelf = require('../config/bookshelf');
var ProgressReport = require('./ProgressReport');
var ExerciseName = require('./ExerciseName');

module.exports = (function() {
  return bookshelf.Model.extend({
    tableName: 'exerciseLogs',
    progressReport: function() {
      return this.belongsTo(ProgressReport);
    },
    exerciseNames: function() {
      return this.hasMany(ExerciseName);
    },
    hasTimestamps: true
  });
})();