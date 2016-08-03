var ControllerPrototype = require('../controller.prototype');
var authHelper = require('../../helpers/authHelper');
var User = require('../../models/User');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/signup'
  });
  var router = controller.router;

  /**
   * POST /signup
   */
  router.post('/', function(req, res, next) {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }

    new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .save()
    .then(function(user) {
      res.send({ 
        token: authHelper.generateToken(user), 
        user: user 
      });
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(400).send({ 
          msg: 'The email address you have entered is already associated with another account.' 
        });
      }
    });
  });

  return controller;
})();