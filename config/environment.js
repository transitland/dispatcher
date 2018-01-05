/* eslint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'dispatcher',
    environment: environment,
    rootURL: '/',
    routerRootURL: '/',
    locationType: 'auto',
    datastoreHost: 'https://transit.land',
    // Valhalla
    valhallaHost: 'https://valhalla.mapzen.com/route',
    valhallaApiKey: 'valhalla-xwXfg5J',
    valhallaRateLimit: 600,
    AUTH_TOKEN_LOCALSTORAGE_KEY: 'transitland-dispatcher-auth-token',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-cli-toggle'] = {
    includedThemes: ['default'],
    defaultShowLabels: true,
    defaultTheme: 'default',
    defaultSize: 'medium',
    defaultOff: 'False',
    defaultOn: 'True'
  };

  if (environment === 'development') {
    ENV.datastoreHost = 'https://transit.land';
  }

  if (environment === 'localhost') {
    ENV.datastoreHost = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.datastoreHost = 'https://dev.transit.land';
    ENV.valhallaHost = 'https://valhalla.dev.mapzen.com/route';
    ENV.valhallaApiKey = 'valhalla-tQaRSNc';
    // ENV.rootURL = '/dispatcher/';
    ENV.routerRootURL = '/dispatcher/';
    ENV.apiProxyKey = 'transitland-YFO6jk8';
  }

  if (environment === 'production') {
    ENV.datastoreHost = 'https://transit.land';
    ENV.routerRootURL = '/dispatcher/';
    ENV.apiProxyKey = 'transitland-Cc6l8Fk';
  }

  // https://github.com/jpadilla/ember-simple-auth-token
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'users.sign_in',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index'
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.datastoreHost + '/api/v1/users/session',
    identificationField: 'email',
    passwordField: 'password',
    refreshAccessTokens: true,
    timeFactor: 1,
    refreshLeeway: 300 // Refresh the token 5 minutes (300s) before it expires.
  };

  return ENV;
};
