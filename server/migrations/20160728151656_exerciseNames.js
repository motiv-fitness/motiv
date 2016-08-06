
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('exerciseNames', function(table) {
      table.increments('id').primary();
      table.string('name', 32);
      table.string('type', 16);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('exerciseNames')
  ]);
};
