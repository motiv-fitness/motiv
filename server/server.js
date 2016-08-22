var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var sass = require('node-sass-middleware');
var router = require('./router');
var authHelper = require('./helpers/authHelper');

// Load environment variables from .env file
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// need for using fetch with serverside rendering
require('es6-promise').polyfill();
require('isomorphic-fetch');

// setup AWS
require('aws-sdk').config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  sslEnabled: true,
  maxRetries: 5,
  logger: process.stdout
});

// React and Server-Side Rendering
var routes = require('../app/routes');
var configureStore = require('../app/store/configureStore').default;

var app = express();

app.set("env", process.env.NODE_ENV || "development");
app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 3000);

app.set('views', path.join(__dirname,'../', 'public'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(sass({ src: path.join(__dirname,'../', 'public'), dest: path.join(__dirname,'../', 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name');
  next();
});

app.use(authHelper.authenticationMiddleware);
router(app, require('./controllers/public/controllers')).init();
router(app, require('./controllers/private/controllers')).initSecured();

// React server rendering
app.use(function(req, res) {
  var initialState = {
    auth: { token: req.cookies.token, user: req.user },
    messages: {}
  };

  var store = configureStore(initialState);

  Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToStaticMarkup(
        React.createElement(Provider, { store: store },
          React.createElement(Router.RouterContext, renderProps)
      ));
      res.render('index', {
        html: html,
        initialState: JSON.stringify(store.getState())
      });
    } else {
      res.sendStatus(404);
    }
  });
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
