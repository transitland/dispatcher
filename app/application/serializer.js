import DS from "ember-data";

export default DS.RESTSerializer.extend({
  // Custom json root. The API returns single models without a JSON root node.
  // We need to re-assign it to the singular version of the model name.
  // So {name: foo} becomes {post: {name: foo}}
  extractSingle: function(store, primaryType, rawPayload, recordId) {
    var typeKey = primaryType.typeKey;
    var payload = {};
    payload[typeKey] = rawPayload;
    return this._super(store, primaryType, payload, recordId);
  },
});
