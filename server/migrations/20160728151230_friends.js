
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('friends', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.integer('user_id1').unsigned().index().references('id').inTable('users');
      table.integer('user_id2').unsigned().index().references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('friends')
  ]);
};
