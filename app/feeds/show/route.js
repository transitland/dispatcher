import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let feed = this.store.findRecord('feed', params['feed_id'], params);
    return Ember.RSVP.hash({
      feed: feed
    });
  }
});
