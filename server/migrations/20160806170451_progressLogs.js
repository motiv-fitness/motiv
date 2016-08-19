
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('progressLogs', function(table) {
      table.increments('id').primary();
      table.integer('current');
      table.string('measurement');
      table.timestamps();
      table.integer('progressReport_id').unsigned().index().references('id').inTable('progressReports').onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('progressLogs')
  ]);
};