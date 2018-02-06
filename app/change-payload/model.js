import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  changeset: DS.belongsTo('changeset', { async: true }),
  payload: DS.attr('', { defaultValue: function() {
    return {
      changes: []
    };
  }}),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  stringified_payload: computed('payload', function() {
    return JSON.stringify(this.get('payload'));
  })
});
