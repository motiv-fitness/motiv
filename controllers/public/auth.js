var ControllerPrototype = require('../controller.prototype');
var User = require('../../models/User');
var authHelper = require('../../helpers/authHelper');
var request = require('request');


module.exports = (function() {
  var controller = ControllerPrototype.create({
    path: '/auth'
  });
  var router = controller.router;

  /**
   * POST /auth/facebook
   * Sign in with Facebook
   */
  router.post('/facebook', function(req, res) {
    var profileFields = ['id', 'name', 'email', 'gender', 'location'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + profileFields.join(',');

    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: process.env.FACEBOOK_SECRET,
      redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
      if (accessToken.error) {
        return res.status(500).send({ msg: accessToken.error.message });
      }

      // Step 2. Retrieve user's profile information.
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
        if (profile.error) {
          return res.status(500).send({ msg: profile.error.message });
        }

        // Step 3a. Link accounts if user is authenticated.
        if (req.isAuthenticated()) {
          new User({ facebook: profile.id })
            .fetch()
            .then(function(user) {
              if (user) {
                return res.status(409).send({ msg: 'There is already an existing account linked with Facebook that belongs to you.' });
              }
              user = req.user;
              user.set('name', user.get('name') || profile.name);
              user.set('gender', user.get('gender') || profile.gender);
              user.set('picture', user.get('picture') || 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
              user.set('facebook', profile.id);
              user.save(user.changed, { patch: true }).then(function() {
                res.send({ token: authHelper.generateToken(user), user: user });
              });
            });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          new User({ facebook: profile.id })
            .fetch()
            .then(function(user) {
              if (user) {
                return res.send({ token: authHelper.generateToken(user), user: user });
              }
              new User({ email: profile.email })
                .fetch()
                .then(function(user) {
                  if (user) {
                    return res.status(400).send({ msg: user.get('email') + ' is already associated with another account.' })
                  }
                  user = new User();
                  user.set('name', profile.name);
                  user.set('email', profile.email);
                  user.set('gender', profile.gender);
                  user.set('location', profile.location && profile.location.name);
                  user.set('picture', 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
                  user.set('facebook', profile.id);
                  user.save().then(function(user) {
                    return res.send({ token: authHelper.generateToken(user), user: user });
                  });
                });
            });
        }
      });
    });
  });

  router.get('/facebook/callback', function(req, res) {
    //res.render('loading');
    res.send('Loading...');
  });

  /**
   * POST /auth/google
   * Sign in with Google
   */
  router.post('/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
      var accessToken = token.access_token;
      var headers = { Authorization: 'Bearer ' + accessToken };

      // Step 2. Retrieve user's profile information.
      request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
        if (profile.error) {
          return res.status(500).send({ message: profile.error.message });
        }
        // Step 3a. Link accounts if user is authenticated.
        if (req.isAuthenticated()) {
          new User({ google: profile.sub })
            .fetch()
            .then(function(user) {
              if (user) {
                return res.status(409).send({ msg: 'There is already an existing account linked with Google that belongs to you.' });
              }
              user = req.user;
              user.set('name', user.get('name') || profile.name);
              user.set('gender', user.get('gender') || profile.gender);
              user.set('picture', user.get('picture') || profile.picture.replace('sz=50', 'sz=200'));
              user.set('location', user.get('location') || profile.location);
              user.set('google', profile.sub);
              user.save(user.changed, { patch: true }).then(function() {
                res.send({ token: authHelper.generateToken(user), user: user });
              });
            });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          new User({ google: profile.sub })
            .fetch()
            .then(function(user) {
              if (user) {
                return res.send({ token: authHelper.generateToken(user), user: user });
              }
              new User({ email: profile.email })
                .fetch()
                .then(function(user) {
                  if (user) {
                    return res.status(400).send({ msg: user.get('email') + ' is already associated with another account.' })
                  }
                  user = new User();
                  user.set('name', profile.name);
                  user.set('email', profile.email);
                  user.set('gender', profile.gender);
                  user.set('location', profile.location);
                  user.set('picture', profile.picture.replace('sz=50', 'sz=200'));
                  user.set('google', profile.sub);
                  user.save().then(function(user) {
                    res.send({ token: authHelper.generateToken(user), user: user });
                  });
                });
            });
        }
      });
    });
  });

  router.get('/google/callback', function(req, res) {
    // res.render('loading');
    res.send('Loading...');
  });

  return controller;
})();