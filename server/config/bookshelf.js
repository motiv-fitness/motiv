var config = require('../../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);
var cascadeDelete = require('bookshelf-cascade-delete');


bookshelf.plugin(cascadeDelete.default);
bookshelf.plugin('registry');
bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');

knex.migrate.latest({directory: __dirname +'/../migrations'});

module.exports = bookshelf;
