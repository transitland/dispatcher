import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  issue_type: DS.attr('string'),
  details: DS.attr('string'),
  open: DS.attr('boolean'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  created_by_changeset_id: DS.attr('number'),
  resolved_by_changeset_id: DS.attr('number'),
  entities_with_issues: DS.hasMany('entity-with-issue', { async: true, inverse: 'issue' }),

  typeDescription: Ember.computed('issue_type', function(){
    switch (this.get('issue_type')) {
      case 'feed_fetch_invalid_url':
        return 'The host as specified may not exist or there may have been a network issue during fetch.';
      case 'feed_fetch_invalid_source':
        return 'GTFS feed does not contain the required files, or there was an unknown problem with fetching.';
      case 'feed_fetch_invalid_response':
        return 'The host responded, but the GTFS feed could not be found or retrieved.';
      case 'feed_fetch_invalid_zip':
        return 'Feed zip structure is not supported.';
    }
  })
});
