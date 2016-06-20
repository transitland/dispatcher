import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  issue_type: DS.attr('string'),
  details: DS.attr('string'),
  block_changeset_apply: DS.attr('boolean'),
  open: DS.attr('boolean'),
  entities_with_issues: DS.attr()
});
