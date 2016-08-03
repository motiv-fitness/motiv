var authHelper = require('./helpers/authHelper');

module.exports = function (app, routes) {
  return {
    init: function() {
      for(var path in routes) {
        app.use(path, routes[path]);
      }
    },
    initSecured: function() {
      for(var path in routes) {
        app.use(path, authHelper.ensureAuthenticated, routes[path]);
      }
    }
  };
};