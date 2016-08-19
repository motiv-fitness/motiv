
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profileImages', function(table) {
      table.increments('id').primary();
      table.string('originalName', 255);
      table.string('contentType', 32);
      table.string('url', 255);
      table.string('caption', 255);
      table.timestamps();
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('profileImages')
  ]);
};
