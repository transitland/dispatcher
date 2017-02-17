import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    this.store.unloadAll('feed');
    let feed = this.store.findRecord('feed', params['feed_id']);
    let routeGeometryIssues = this.store.query('issue', { of_feed_entities: params['feed_id'], category: 'route_geometry', per_page: 0, total: true });
    let stationHierarchyIssues = this.store.query('issue', { of_feed_entities: params['feed_id'], category: 'station_hierarchy', per_page: 0, total: true });
    return Ember.RSVP.hash({
      feed: feed,
      routeGeometryIssues: routeGeometryIssues,
      stationHierarchyIssues: stationHierarchyIssues
    });
  },
  actions: {
    feedFetchStarted: function() {
      this.refresh();
    }
  }
});
