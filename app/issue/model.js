import DS from 'ember-data';

export default DS.Model.extend({
  issue_type: DS.attr('string'),
  details: DS.attr('string'),
  open: DS.attr('boolean'),
  //entities_with_issues: DS.hasMany('entity-with-issues', { async: true, inverse: 'issue' })
  entities_with_issues: DS.attr()
});
