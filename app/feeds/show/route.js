import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let feed = this.store.findRecord('feed', params['feed_id'], params);
    let issue_types = ['feed_fetch_invalid_source', 'feed_fetch_invalid_zip', 'feed_fetch_invalid_response', 'feed_fetch_invalid_url'];
    return Ember.RSVP.hash({
      feed: feed
    });
  }
});
