import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  issue: DS.belongsTo('issue', {inverse: 'entities_with_issues'}),
  onestop_id: DS.attr('string'),
  entity_type: DS.attr('string'),
  entity_attribute: DS.attr('string'),
  entity: computed('onestop_id', 'entity_type', function(){
    return this.store.findRecord(this.get('entity_type'), this.get('onestop_id'));
  })
});
