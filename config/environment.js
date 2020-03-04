'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'dispatcher',
    environment: environment,
    rootURL: '/',
    routerRootURL: '/',
    locationType: 'auto',
    datastoreHost: 'https://api.transit.land',
    // Valhalla
    valhallaHost: 'https://valhalla.interline.io/route',
    valhallaApiKey: 'TODO',
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
    ENV.datastoreHost = 'https://api.transit.land';
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

  if (environment === 'production') {
    ENV.datastoreHost = 'https://api.transit.land';
    ENV.routerRootURL = '/dispatcher/';
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

  ENV.transitlandApiKey = process.env.TRANSITLAND_API_KEY;

  return ENV;
};
