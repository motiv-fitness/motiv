
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('progressNames', function(table) {
      table.increments('id').primary();
      table.string('type', 16);           // diet, exercise
      table.string('name', 32);
      table.string('description');        // weightlighting, cardio 
      table.timestamps();
      table.integer('goal_id').unsigned().index().references('id').inTable('goals').onDelete('cascade');
      table.integer('progressLog_id').unsigned().index().references('id').inTable('progressLogs').onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('progressNames')
  ]);
};