import DS from 'ember-data';

export default Model.extend({
  issue: DS.belongsTo('issue', { async: true, inverse: 'entities_with_issues' }),
  entity_type: DS.attr('string'),
  entity_attribute: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
