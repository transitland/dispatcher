import Ember from 'ember';

export function stringifyJson(json) {
  return new Ember.Handlebars.SafeString(JSON.stringify(json, null, ' '));
}

export default Ember.Helper.helper(stringifyJson);
