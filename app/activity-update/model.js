import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  entity: DS.belongsTo('entity-with-activity', { async: true, polymorphic: true}),
  user: DS.belongsTo('user', { async: true }),

  entity_type: DS.attr('string'),
  entity_id: DS.attr('string'),
  entity_action: DS.attr('string'),
  by_user_id: DS.attr('number'),
  note: DS.attr('string'),
  at_datetime: DS.attr('date'),

  entityShowRoute: Ember.computed('entity_type', function() {
    return this.get('entity_type') + 's.show';
  }),
});
