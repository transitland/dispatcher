import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'dispatcher/config/environment';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  host: ENV.datastoreHost,
  namespace: 'api/v1',
  coalesceFindRequests: true,
  headers: Ember.computed('session.authToken', function() {
    // Sometimes this is loaded before the session is available.
    // For example, when the users index route goes out to GET users.
    var authToken = this.get("session.authToken") || localStorage.getItem(ENV.AUTH_TOKEN_LOCALSTORAGE_KEY);
    return {
      'Authorization': `Token token=${authToken}`
    };
  }),
  pathForType: function(type) {
    // model names should be underscored in URLs
    // For example: /api/v1/feed_version_imports
    let decamelized = Ember.String.decamelize(type);
    let underscored = Ember.String.underscore(decamelized);
    return Ember.String.pluralize(underscored);
  },
  ajaxOptions: function(url, type, options) {
    var hash = this._super(url, type, options);
    // only need to include api_key when making GET requests
    // because those are the most frequent type of request.
    // if we include api_key in POSTs or PUTs, Datastore will barf
    if (type === 'GET') {
      let data = {};
      if (typeof(hash.data) === 'string') {
        data = JSON.parse(hash.data);
      } else if (typeof(hash.data) !== "undefined") {
        data = hash.data;
      } else {
        data = {};
      }
      if (typeof(ENV.apiProxyKey) !== "undefined" ) {
        data["api_key"] = ENV.apiProxyKey;
      }
      data["total"] = true;
      data["embed_issues"] = true;
      hash.data = data;
    }
    return hash;
  }
});
