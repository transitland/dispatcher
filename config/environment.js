/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dispatcher',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    datastoreHost: 'https://transit.land',
    AUTH_TOKEN_LOCALSTORAGE_KEY: 'transitland-dispatcher-auth-token',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'default-src': "'none' 'self' https://*.cloudfront.net",
      'connect-src': "'self' https://*.transit.land https://transit.land http://localhost:*",
      'img-src': "'self' data: ",
      "child-src": "'self' blob:",
      'style-src': "'self' 'unsafe-inline'",
      'media-src': "'self'",
      'script-src': "'self'",
      'font-src': "'self' https://*.cloudfront.net"
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
    ENV.datastoreHost = 'http://localhost:3000';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.datastoreHost = 'https://dev.transit.land';
    ENV.baseURL = '/dispatcher';
    ENV.apiProxyKey = 'transitland-YFO6jk8';
  }

  if (environment === 'production') {
    ENV.datastoreHost = 'https://transit.land';
    ENV.baseURL = '/dispatcher';
    ENV.apiProxyKey = 'transitland-Cc6l8Fk';
  }

  return ENV;
};
