var ControllerPrototype = require('../controller.prototype');
var User = require('../../models/User');
var authHelper = require('../../helpers/authHelper');


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
    res.render('loading');
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
    res.render('loading');
  });

  /**
   * POST /auth/twitter
   * Sign in with Twitter
   */
  router.post('/twitter', function(req, res) {
    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

    // Part 1 of 2: Initial POST request to obtain OAuth request token.
    if (!req.body.oauth_token || !req.body.oauth_verifier) {
      var requestTokenOauthSignature = {
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET,
        callback: req.body.redirectUri
      };

      // Step 1. Obtain request token to initiate app authorization.
      // At this point nothing is happening inside a popup yet.
      request.post({ url: requestTokenUrl, oauth: requestTokenOauthSignature }, function(err, response, body) {
        var oauthToken = qs.parse(body);

        // Step 2. Send OAuth token back.
        // After request token is sent back, a popup will redirect to the Twitter app authorization screen.
        // Unlike Facebook and Google (OAuth 2.0), we have to do this extra step for Twitter (OAuth 1.0).
        res.send(oauthToken);
      });
    } else {
      // Part 2 of 2: Second POST request after "Authorize app" button is clicked.
      // OAuth 2.0 basically starts from Part 2, but with OAuth 1.0 we need to do that extra step in Part 1.
      var accessTokenOauth = {
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET,
        token: req.body.oauth_token,
        verifier: req.body.oauth_verifier
      };

      // Step 3. Exchange "oauth token" and "oauth verifier" for access token.
      request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {
        accessToken = qs.parse(accessToken);

        var profileOauth = {
          consumer_key: process.env.TWITTER_KEY,
          consumer_secret: process.env.TWITTER_SECRET,
          oauth_token: accessToken.oauth_token
        };

        // Step 4. Retrieve user's profile information.
        request.get({ url: profileUrl + accessToken.screen_name, oauth: profileOauth, json: true }, function(err, response, profile) {

          // Step 5a. Link accounts if user is authenticated.
        if (req.isAuthenticated()) {
          new User({ twitter: profile.id })
            .fetch()
            .then(function(user) {
              if (user) {
                return res.status(409).send({ msg: 'There is already an existing account linked with Twitter that belongs to you.' });
              }
              user = req.user;
              user.set('name', user.get('name') || profile.name);
              user.set('location', user.get('location') || profile.location);
              user.set('picture', user.get('picture') || profile.profile_image_url_https);
              user.set('twitter', profile.id);
              user.save(user.changed, { patch: true }).then(function() {
                res.send({ token: authHelper.generateToken(user), user: user });
              });
            });
        } else {
          // Step 5b. Create a new user account or return an existing one.
          new User({ twitter: profile.id })
            .fetch()
            .then(function(user) {
              if (user) {
                return res.send({ token: authHelper.generateToken(user), user: user });
              }
              // Twitter does not provide an email address, but email is a required field in our User schema.
              // We can "fake" a Twitter email address as follows: username@twitter.com.
              user = new User();
              user.set('name', profile.name);
              user.set('email', profile.username + '@twitter.com');
              user.set('location', profile.location);
              user.set('picture', profile.profile_image_url_https);
              user.set('twitter', profile.id);
              user.save().then(function(user) {
                res.send({ token: authHelper.generateToken(user), user: user });
              });
            });
        }
        });
      });
    }
  });

  router.get('/twitter/callback', function(req, res) {
    res.render('loading');
  });

  /**
   * POST /auth/github
   * Sign in with Github
   */
  router.post('/github', function(req, res) {
    var accessTokenUrl = 'https://github.com/login/oauth/access_token';
    var userUrl = 'https://api.github.com/user';

    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: process.env.GITHUB_SECRET,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
      var accessToken = token.access_token;
      var headers = { 
          Authorization: 'Bearer ' + accessToken,
          'User-Agent': 'MegaBoilerplate'
        };
      // Step 2. Retrieve user's profile information.
      request.get({ url: userUrl, headers: headers, json: true }, function(err, response, profile) {
        if (profile.error) {
          return res.status(500).send({ message: profile.error.message });
        }
        // Step 3a. Link accounts if user is authenticated.
        if (req.isAuthenticated()) {
          new User({ github: profile.id })
            .fetch()
            .then(function(user) {
              if (user) {
                return res.status(409).send({ msg: 'There is already an existing account linked with Github that belongs to you.' });
              }
              user = req.user;
              user.set('name', user.get('name') || profile.name);
              user.set('picture', user.get('picture') || profile.avatar_url);
              user.set('location', user.get('location') || profile.location);
              user.set('github', profile.id);
              user.save(user.changed, { patch: true }).then(function() {
                res.send({ token: authHelper.generateToken(user), user: user });
              });
            });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          new User({ github: profile.id })
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
                  user.set('location', profile.location);
                  user.set('picture', profile.avatar_url);
                  user.set('github', profile.id);
                  user.save().then(function(user) {
                    res.send({ token: authHelper.generateToken(user), user: user });
                  });
                });
            });
        }
      });
    });
  });

  router.get('/github/callback', function(req, res) {
    res.render('loading');
  });

  return controller;
})();