
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('regimes', function(table) {
      table.increments('id').primary();
      table.string('label');         // day1
      table.string('name');          // deadlift
      table.string('type');          // lifting
      table.timestamps();
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('regimes')
  ]);
};
