import DS from "ember-data";
import Ember from "ember";
import { underscore } from '@ember/string';
import { isEmpty } from '@ember/utils';

export default DS.RESTSerializer.extend({
  // Custom json root. The API returns single models without a JSON root node.
  // We need to re-assign it to the singular version of the model name.
  // So {name: foo} becomes {post: {name: foo}}
  normalizeSingleResponse: function(store, primaryModelClass, rawPayload, id, requestType) {
    var payload = {};
    payload[primaryModelClass.modelName] = rawPayload;
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  serializeIntoHash: function(data, type, record, options) {
    var root = underscore(type.modelName);
    data[root] = this.serialize(record, options);
  },
  extractMeta: function(store, typeClass, payload) {
    if (payload && payload.hasOwnProperty('meta')) {
      if (!payload.meta.hasOwnProperty('next') || isEmpty(payload.meta.next)) {
        // The meta.next property will be used by app/mixins/paginated-sortable-controller
        // to decide if there's another page of results. By default, Ember Data
        // won't nullify the meta properties from a past result. So we'll do that
        // here...
        payload.meta.next = null;
      }
    }
    return this._super(store, typeClass, payload);
  }
});
