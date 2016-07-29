
exports.up = function(knex, Promise) {
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
    }),
    knex.schema.createTableIfNotExists('regimes', function(table) {
      table.increments('id').primary();
      table.string('type', 20);
      table.string('name', 30);
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('users', function(table) {
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
      table.string('role', 20);
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('friends', function(table) {
      table.increments('id').primary();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('profileImages', function(table) {
      table.increments('id').primary();
      table.string('url', 255);
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('exerciseNames', function(table) {
      table.increments('id').primary();
      table.string('name', 32);
      table.string('type', 16);
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('exerciseLogs', function(table) {
      table.increments('id').primary();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('progressReports', function(table) {
      table.increments('id').primary();
      table.dateTime('date');
      table.double('weight');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('progressReportImages', function(table) {
      table.increments('id').primary();
      table.string('url', 255);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('regimes'),
    knex.schema.dropTable('friends'),
    knex.schema.dropTable('profileImages'),
    knex.schema.dropTable('exerciseNames'),
    knex.schema.dropTable('exerciseLogs'),
    knex.schema.dropTable('progressReportImages')
  ]);
};
