
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('regimes', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('type');
      table.timestamps();
      table.integer('user_id').unsigned().index().references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('regimes')
  ]);
};