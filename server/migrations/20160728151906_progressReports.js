
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('progressReports', function(table) {
      table.increments('id').primary();
      table.dateTime('date');
      table.double('weight');
      table.timestamps();
      table.integer('user_id').unsigned().index().references('id').inTable('users');
    }),
    knex.schema.createTableIfNotExists('progressReportImages', function(table) {
      table.increments('id').primary();
      table.string('originalName', 255);
      table.string('contentType', 32);
      table.string('url', 255);
      table.string('caption', 255);
      table.timestamps();
      table.integer('progressReport_id').unsigned().index().references('id').inTable('progressReports');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('progressReports'),
    knex.schema.dropTable('progressReportImages')
  ]);
};
