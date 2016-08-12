var jwt = require('jsonwebtoken');
var moment = require('moment');
var User = require('../models/User');

module.exports = (function() {
  function generateToken(user) {
    var payload = {
      iss: 'my.domain.com',
      sub: user.id,
      iat: moment().unix(),
      exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  }

  function isAuthenticated() {
    var token = (this.headers.authorization
        && this.headers.authorization.split(' ')[1])
        || this.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  }

  function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated && req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  }

  function authenticationMiddleware(req, res, next) {
    req.isAuthenticated = isAuthenticated;
    if (req.isAuthenticated()) {
      var payload = req.isAuthenticated();
      new User({ id: payload.sub })
        .fetch()
        .then(function(user) {
          req.user = user;
          next();
        });
    } else {
      next();
    }
  };

  return {
    generateToken: generateToken,
    isAuthenticated: isAuthenticated,
    ensureAuthenticated: ensureAuthenticated,
    authenticationMiddleware: authenticationMiddleware
  };
})();
