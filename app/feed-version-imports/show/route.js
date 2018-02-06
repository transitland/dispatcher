import Route from '@ember/routing/route';

export default Route.extend({
  model: function(params) {
    return this.store.findRecord('feed-version-import', params['feed_version_import_id']);
  },
  actions: {
  }
});
