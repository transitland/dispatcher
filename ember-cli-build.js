/*jshint node:true*/
/* global require, module */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var prependUrl;
  if (EmberApp.env() === 'staging') {
    prependUrl = 'https://d2tkmr00hnrtoq.cloudfront.net/';
  } else if (EmberApp.env() === 'production') {
    prependUrl = 'https://d11xhlzkgsq6oc.cloudfront.net/';
  }

  var app = new EmberApp(defaults, {
    minifyJS: {
      enabled: ['production'].indexOf(EmberApp.env()) >= 0
    },
    minifyCSS: {
      enabled: ['staging', 'production'].indexOf(EmberApp.env()) >= 0
    },
    // http://ember-cli.com/user-guide/#source-maps
    sourcemaps: {
      enabled: EmberApp.env() !== 'production'
    },
    // https://github.com/aexmachina/ember-cli-sass#usage
    sassOptions: {
      sourceMap: EmberApp.env() !== 'production'
    },
    // http://ember-cli.com/user-guide/#fingerprinting-and-cdn-urls
    fingerprint: {
      enabled: ['staging', 'production'].indexOf(EmberApp.env()) >= 0,
      prepend: prependUrl
    },
    // https://www.npmjs.com/package/ember-cli-bootstrap-sassy#bootstrap-javascript
    'ember-cli-bootstrap-sassy': {
      'glyphicons': true
    },
    // https://github.com/martndemus/ember-cli-font-awesome#customize-with-sassscss
    emberCliFontAwesome: {
      useScss: true
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // import code and styles for JSON Editor
  // used by app/components/json-editor/component.js
  app.import(app.bowerDirectory + '/jsoneditor/dist/jsoneditor.js');
  app.import(app.bowerDirectory + '/jsoneditor/dist/jsoneditor.css');
  app.import(app.bowerDirectory + '/jsoneditor/dist/img/jsoneditor-icons.svg', {
    destDir: 'assets/img'
  });

  return app.toTree();
};
