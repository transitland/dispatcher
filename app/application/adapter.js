import DS from 'ember-data';
import ENV from 'dispatcher/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { pluralize } from 'ember-inflector';
import { decamelize, underscore } from '@ember/string';
import PromiseThrottle from 'dispatcher/application/promise-throttle';
import { Promise } from 'rsvp';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  init() {
    this.set('promiseThrottle', new PromiseThrottle({
      requestsPerSecond: 4,
      promiseImplementation: Promise
    }));
  },
  authorizer: 'authorizer:token',
  host: ENV.datastoreHost,
  namespace: 'api/v1',
  coalesceFindRequests: true,
  pathForType: function(type) {
    // model names should be underscored in URLs
    // For example: /api/v1/feed_version_imports
    let decamelized = decamelize(type);
    let underscored = underscore(decamelized);
    return pluralize(underscored);
  },
  ajaxOptions: function(url, type, options) {
    var hash = this._super(url, type, options);
    hash.beforeSend = function (xhr) {
      xhr.setRequestHeader('apikey', ENV.transitlandApiKey);
    }
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
  },
  ajax: function (url, type, options) {
    return this.get('promiseThrottle').add(this._super.bind(this, url, type, options));
  }
});
