import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  payload: DS.attr(),
  notes: DS.attr('string'),
  applied: DS.attr('boolean'),
  applied_at: DS.attr('date'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  stringified_payload: Ember.computed('payload', function() {
    return JSON.stringify(this.get('payload'));
  }),
  apply: function() {
    var applicationAdapter = this.store.adapterFor(this.constructor.typeKey);
    var modelUrl = applicationAdapter.buildURL('changeset', this.id);
    var applyUrl = modelUrl + '/apply';
    return applicationAdapter.ajax(applyUrl, 'post');
  }
});
