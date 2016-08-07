
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('feedItems', function(table) {
      table.increments('id').primary();
      table.date('dateTime');
      table.string('content');
      table.timestamps();
      table.integer('user_id').unsigned().index().references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('feedItems')
  ]);
};