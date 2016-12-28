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
      let self = this;
      adapter.ajax(url, 'post', params)
        .then( () => {
          flashMessages.success('Starting to fetch feed(s)!');
          self.sendAction('feedFetchStarted');
        }).catch(function(error) {
          flashMessages.danger(`Error(s) fetching feed(s): ${error.message}`);
        });
    }
  }
});
