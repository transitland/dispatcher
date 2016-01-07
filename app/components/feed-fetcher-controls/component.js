import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    fetchFeeds: function() {
      var adapter = this.get('store').adapterFor('feed');
      var url = adapter.urlPrefix() + '/webhooks/feed_fetcher';
      const flashMessages = Ember.get(this, 'flashMessages');
      adapter.ajax(url, 'post', {})
      .then( () => {
        flashMessages.success('Starting to fetch feeds!');
      }).catch( () => {
        flashMessages.danger('Error fetching feeds.');
      });
    }
  }
});
