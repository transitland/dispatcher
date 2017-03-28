import Ember from 'ember';

export default Ember.Service.extend({
  typeDescription: function(issue_type) {
    switch (issue_type) {
      case 'feed_fetch_invalid_url':
        return 'The host as specified may not exist or there may have been a network issue during fetch.';
      case 'feed_fetch_invalid_source':
        return 'GTFS feed does not contain the required files, or there was an unknown problem with fetching.';
      case 'feed_fetch_invalid_response':
        return 'The host responded, but the GTFS feed could not be found or retrieved.';
      case 'feed_fetch_invalid_zip':
        return 'Feed zip structure is not supported.';
    }
  },
});
