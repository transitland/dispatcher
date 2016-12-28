import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  store: Ember.inject.service(),
  buttonText: 'Fetch',
  actions: {
    fetchFeeds: function() {
      var adapter = this.get('store').adapterFor('feed');
      var url = adapter.urlPrefix() + '/webhooks/feed_fetcher';
      const flashMessages = Ember.get(this, 'flashMessages');
      var params = {};
      if (Ember.isPresent(this.get("feed"))) {
        params["data"] = {
          feed_onestop_id: this.get("feed.onestop_id")
        };
      } else if (Ember.isPresent(this.get("feeds"))) {
        params["data"] = {
          feed_onestop_id: this.get("feeds").mapBy("onestop_id").join(",")
        };
      }
      adapter.ajax(url, 'post', params)
        .then( () => {
          flashMessages.add({
            message: 'Starting to fetch feed(s)!',
            type: 'success',
            sticky: true
          });
        }).catch(function(error) {
          flashMessages.add({
            message: `Error(s) fetching feed(s): ${error.message}`,
            type: 'danger',
            sticky: true
          });
        });
    }
  }
});
