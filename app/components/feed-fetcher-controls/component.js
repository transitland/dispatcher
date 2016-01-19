import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    fetchFeeds: function() {
      var adapter = this.get('store').adapterFor('feed');
      var url = adapter.urlPrefix() + '/webhooks/feed_fetcher';
      const flashMessages = Ember.get(this, 'flashMessages');
      var params = {};
      if (typeof(this.get("feed")) !== 'undefined') {
        params["data"] = {
          feed_onestop_id: this.get("feed.onestop_id")
        };
      }
      adapter.ajax(url, 'post', params)
      .then( () => {
        flashMessages.success('Starting to fetch feeds!');
      }).catch( () => {
        flashMessages.danger('Error fetching feeds.');
      });
    }
  }
});
