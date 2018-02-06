import Route from '@ember/routing/route'

export default Route.extend({
  model: function(params) {
    return this.store.findRecord('feed-version', params['feed_version_id']);
  }
});
