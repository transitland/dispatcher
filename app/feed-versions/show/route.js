import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('feed-version', params['feed_version_id']);
  },
  actions: {
  }
});
