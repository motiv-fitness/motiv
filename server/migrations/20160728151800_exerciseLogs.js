
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('exerciseLogs', function(table) {
      table.increments('id').primary();
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('exerciseLogs')
  ]);
};
