import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'dispatcher/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:token',
  host: ENV.datastoreHost,
  namespace: 'api/v1',
  coalesceFindRequests: true,
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
      data["total"] = true;
      data["embed_issues"] = true;
      hash.data = data;
    }
    return hash;
  }
});
