var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);
var ProgressReport = require('./ProgressReport');
var ExerciseName = require('./ExerciseName');

module.exports = (function() {
  return ModelBase.extend({
    tableName: 'exerciseLogs',
    
    progressReport: function() {
      return this.belongsTo(ProgressReport);
    },
    exerciseNames: function() {
      return this.hasMany(ExerciseName);
    }
  });
})();