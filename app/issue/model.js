import Ember from 'ember';
import DS from 'ember-data';

// var inflector = Ember.Inflector.inflector;
// inflector.plural(/entity-with-issue/i, 'entities-with-issues');
// inflector.singular(/entities-with-issue/i, 'entity-with-issues');

export default DS.Model.extend({
  issue_type: DS.attr('string'),
  details: DS.attr('string'),
  open: DS.attr('boolean'),
  entities_with_issues: DS.hasMany('entity-with-issue', { async: true, inverse: 'issue' })
});
