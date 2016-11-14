import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let feed = this.store.query('feed', params);
    let issue_types = ['feed_fetch_invalid_source', 'feed_fetch_invalid_zip', 'feed_fetch_invalid_response', 'feed_fetch_invalid_url']
    let issue = this.store.query('issue', { of_entity: params['feed_id'], issue_type: issue_types.join(',') } );
    return Ember.RSVP.hash({
      feed: feed,
      issue: issue
    });
  }
});
