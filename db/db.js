var config = require('../knexfile.js');
var knex = require('knex')(config);

module.exports = (function() {
  var db = {};
  
  db.ensureSchema = function() {
    function logCreateSuccess(table) {
      console.log('Successfully created ' + table + ' table.');
    }
    function logCreateError(table, error) {
      console.log('Skip creating ' + table + ' table.');
    }
    return Promise.all([
      knex.schema.createTableIfNotExists('locations', function (table) {
        table.increments('id').primary();
        table.string('address', 95);
        table.string('city', 35);
        table.string('country', 2);
        table.string('state', 2);
        table.string('zipcode', 20);
        table.float('lat');
        table.float('lng');
        table.timestamps();
        return table;
      })
      .then(logCreateSuccess.bind(db, 'locations'))
      .catch(logCreateError.bind(db, 'locations')),
      knex.schema.createTableIfNotExists('regimes', function(table) {
        table.increments('id').primary();
        table.string('type', 20);
        table.string('name', 30);
        table.timestamps();
      })
      .then(logCreateSuccess.bind(db, 'regimes'))
      .catch(logCreateError.bind(db, 'regimes')),
      knex.schema.createTableIfNotExists('users', function (table) {
        table.increments('id').primary();
        table.string('username', 20);
        table.string('email', 128);
        table.string('password', 255);
        table.string('passwordResetToken', 255);
        table.string('passwordResetExpires', 255);
        table.string('location', 255);
        table.string('gender', 15);
        table.string('website', 255);
        table.string('facebook', 255);
        table.string('twitter', 255);
        table.string('google', 255);
        table.string('github', 255);
        table.string('role', 20);
        table.integer('id_locations').unsigned().references('id').inTable('locations');
        table.integer('id_regimes').unsigned().references('id').inTable('regimes');
        table.timestamps();
      })
      .then(logCreateSuccess.bind(db, 'users'))
      .catch(logCreateError.bind(db, 'users')),     
      knex.schema.createTableIfNotExists('friends', function(table) {
        table.increments('id').primary();
        table.integer('id_users').unsigned().references('id').inTable('users');
        table.timestamps();
      })
      .then(logCreateSuccess.bind(db, 'friends'))
      .catch(logCreateError.bind(db, 'friends')),
      knex.schema.createTableIfNotExists('profileImages', function(table) {
        table.increments('id').primary();
        table.string('url', 255);
        table.integer('id_users').unsigned().references('id').inTable('users');
        table.timestamps();
      })
      .then(logCreateSuccess.bind(db, 'profileImages'))
      .catch(logCreateError.bind(db, 'profileImages')),
      knex.schema.createTableIfNotExists('exerciseNames', function(table) {
        table.increments('id').primary();
        table.string('name', 32);
        table.string('type', 16);
        table.timestamps();
      })
      .then(logCreateSuccess.bind(db, 'exerciseNames'))
      .catch(logCreateError.bind(db, 'exerciseNames')),
      knex.schema.createTableIfNotExists('exerciseLogs', function(table) {
        table.increments('id').primary();
        table.integer('id_exerciseNames').unsigned().references('id').inTable('exerciseNames');
        table.timestamps();
      })
      .then(logCreateSuccess.bind(db, 'exerciseLogs'))
      .catch(logCreateError.bind(db, 'exerciseLogs')),
      knex.schema.createTableIfNotExists('progressReports', function(table) {
        table.increments('id').primary();
        table.dateTime('date');
        table.double('weight');
        table.integer('id_users').unsigned().references('id').inTable('users');
        table.integer('id_exerciseLogs').unsigned().references('id').inTable('exerciseLogs');
        table.timestamps();
      })
      .then(logCreateSuccess.bind(db, 'progressReports'))
      .catch(logCreateError.bind(db, 'progressReports')),
      knex.schema.createTableIfNotExists('progressReportImages', function(table) {
        table.increments('id').primary();
        table.string('url', 255);
        table.integer('id_progressReports').unsigned().references('id').inTable('progressReports');
        table.timestamps();
      })
      .then(logCreateSuccess.bind(db, 'progressReportImages'))
      .catch(logCreateError.bind(db, 'progressReportImages'))
      

    ]);
  };




  return db;
})();