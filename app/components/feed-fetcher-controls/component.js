import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    fetchFeeds: function() {
      var adapter = this.get('store').adapterFor('feed');
      var url = adapter.urlPrefix() + '/webhooks/feed_fetcher';
      adapter.ajax(url, 'post', {});
    }
  }
});
