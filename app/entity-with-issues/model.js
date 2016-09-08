import Ember from 'ember';
import DS from 'ember-data';

var inflector = Ember.Inflector.inflector;
inflector.plural(/entity-with-issue/i, 'entities-with-issues');
inflector.singular(/entities-with-issue/i, 'entity-with-issues');

export default DS.Model.extend({
  issue: DS.belongsTo('issue', {inverse: 'entities_with_issues'}),
  onestop_id: DS.attr('string'),
  entity_attribute: DS.attr('string')
});
