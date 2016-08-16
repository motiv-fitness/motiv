exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('locations', function (table) {
      table.increments('id').primary();
      table.string('address', 95);
      table.string('city', 35);
      table.string('country', 2);
      table.string('state', 2);
      table.string('zipcode', 20);
      table.float('lat');
      table.float('lng');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id').primary();
      table.string('name', 20);
      table.string('email', 128);
      table.string('password', 255);
      table.string('passwordResetToken', 255);
      table.string('passwordResetExpires', 255);
      table.string('location', 255);
      table.string('picture', 255);
      table.string('gender', 15);
      table.string('website', 255);
      table.string('facebook', 255);
      table.string('google', 255);
      table.string('role', 20);
      table.string('url', 255);
      table.timestamps();
      table.integer('location_id').unsigned().index().references('id').inTable('locations');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('locations')
  ]);
};
