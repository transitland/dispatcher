import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  issue: DS.belongsTo('issue', {inverse: 'entities_with_issues'}),
  onestop_id: DS.attr('string'),
  entity_attribute: DS.attr('string')
});
