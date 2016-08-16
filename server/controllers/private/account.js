var ControllerPrototype = require('../controller.prototype');
var User = require('../../models/User');


module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/account'
  });
  var router = controller.router;

   /**
   * PUT /account
   * Update profile information OR change password.
   */
  router.put('/', function(req, res) {
    if ('password' in req.body) {
      req.assert('password', 'Password must be at least 4 characters long').len(4);
      req.assert('confirm', 'Passwords must match').equals(req.body.password);
    } else {
      req.assert('email', 'Email is not valid').isEmail();
      req.assert('email', 'Email cannot be blank').notEmpty();
      req.sanitize('email').normalizeEmail({ remove_dots: false });
    }

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }

    var user = new User({ id: req.user.id });
    if ('password' in req.body) {
      user.save({ password: req.body.password }, { patch: true });
    } else {
      user.save({
        email: req.body.email,
        name: req.body.name,
        gender: req.body.gender,
        location: req.body.location,
        website: req.body.website,
        url: req.body.url
      }, { patch: true });
    }
    user.fetch().then(function(user) {
      if ('password' in req.body) {
        res.send({ msg: 'Your password has been changed.' });
      } else {
        res.send({ user: user, msg: 'Your profile information has been updated.' });
      }
      res.redirect('/account');
    }).catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).send({ msg: 'The email address you have entered is already associated with another account.' });
      }
    });
  });

  /**
   * DELETE /account
   */
  router.delete('/', function(req, res) {
    new User({ id: req.user.id }).destroy().then(function(user) {
      res.send({ msg: 'Your account has been permanently deleted.' });
    });
  });

  /**
   * GET /account/unlink/:provider
   */
  router.unlink('/unlink/:provider', function(req, res) {
    new User({ id: req.user.id })
      .fetch()
      .then(function(user) {
        switch (req.params.provider) {
          case 'facebook':
            user.set('facebook', null);
            break;
          case 'google':
            user.set('google', null);
            break;
          default:
          return res.status(400).send({ msg: 'Invalid OAuth Provider' });
        }
        user.save(user.changed, { patch: true }).then(function() {
        res.send({ msg: 'Your account has been unlinked.' });
        });
      });
  });
  return controller;
})();