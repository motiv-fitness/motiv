
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('progressReports', function(table) {
      table.increments('id').primary();
      table.dateTime('date');
      table.double('weight');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('progressReportImages', function(table) {
      table.increments('id').primary();
      table.string('originalName', 255);
      table.string('contentType', 32);
      table.string('url', 255);
      table.integer('user_id').unsigned().index().references('id').inTable('users');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('progressReports'),
    knex.schema.dropTable('progressReportImages')
  ]);
};
