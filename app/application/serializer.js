import DS from "ember-data";

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
    var root = Ember.String.underscore(type.modelName);
    data[root] = this.serialize(record, options);
  }
});
