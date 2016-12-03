import DS from 'ember-data';

export default DS.Model.extend({
  issue_type: DS.attr('string'),
  details: DS.attr('string'),
  open: DS.attr('boolean'),
  entities_with_issues: DS.attr(),

  typeDescription: Ember.computed('issue_type', function(){
    switch (this.get('issue_type')) {
      case 'feed_fetch_invalid_url':
        return 'The host as specified may not exist or there may have been a network issue during fetch.';
      case 'feed_fetch_invalid_source':
        return 'GTFS feed does not contain the required files.';
      case 'feed_fetch_invalid_response':
        return 'The host responded, but the GTFS feed could not be found or retrieved.';
      case 'feed_fetch_invalid_zip':
        return 'Feed zip structure is not supported.';
    }
  })
});
