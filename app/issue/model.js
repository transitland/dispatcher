import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  typeDescription: Ember.inject.service('issue-type-desc'),
  issue_type: DS.attr('string'),
  details: DS.attr('string'),
  open: DS.attr('boolean'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  created_by_changeset_id: DS.attr('number'),
  resolved_by_changeset_id: DS.attr('number'),
  entities_with_issues: DS.hasMany('entity-with-issue', { async: true, inverse: 'issue' }),
  imported_from_feed_onestop_id: DS.attr('string'),
  imported_from_feed_version_sha1: DS.attr('string'),

  computeTypeDescription: Ember.computed('issue_type', function(){
    return this.get('typeDescription').typeDescription(this.get('issue_type'));
  })
});
