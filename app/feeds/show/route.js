import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    this.store.unloadAll('feed');
    let feed = this.store.findRecord('feed', params['feed_id']);
    let routeGeometryIssues = this.store.query('issue', { of_feed_entities: params['feed_id'], category: 'route_geometry', per_page: 0, total: true });
    let stationHierarchyIssues = this.store.query('issue', { of_feed_entities: params['feed_id'], category: 'station_hierarchy', per_page: 0, total: true });
    let feedVersions = this.store.query('feed-version', { sort_key: 'earliest_calendar_date', sort_order: 'desc', per_page: false, feed_onestop_id: params['feed_id'] })
    let self = this;
    return Ember.RSVP.hash({
      feed: feed,
      feedVersions: feedVersions,
      routeGeometryIssues: routeGeometryIssues,
      stationHierarchyIssues: stationHierarchyIssues
    }).then(function (model) {
      let i = model.feedVersions.map(function(i){return i.id}).join(',');
      let feedVersionInfoStatistics = self.store.query('feed-version-info', {'feed_version_sha1': i, type: 'FeedVersionInfoStatistics', per_page: false} );
      return Ember.RSVP.hash({
        feed: model.feed,
        feedVersions: model.feedVersions,
        routeGeometryIssues: routeGeometryIssues,
        stationHierarchyIssues: stationHierarchyIssues,
        feedVersionInfoStatistics: feedVersionInfoStatistics
      })
    })
  },
  actions: {
    feedFetchStarted: function() {
      this.refresh();
    }
  }
});
