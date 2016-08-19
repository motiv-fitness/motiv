
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('goals', function(table) {
      table.increments('id').primary();
      table.integer('target');
      table.string('measurement');
      table.timestamps();
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('goals')
  ]);
};