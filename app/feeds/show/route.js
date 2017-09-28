import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    sort_key: {
      refreshModel: true
    }
  },
  model: function(params) {
    this.store.unloadAll('feed');


    let sort_key = (params.sort_key || 'earliest_calendar_date');
    let feed = this.store.findRecord('feed', params['feed_id']);
    let routeGeometryIssues = this.store.query('issue', { of_feed_entities: params['feed_id'], category: 'route_geometry', per_page: 0, total: true });
    let stationHierarchyIssues = this.store.query('issue', { of_feed_entities: params['feed_id'], category: 'station_hierarchy', per_page: 0, total: true });
    let feedVersions = this.store.query('feed-version', { per_page: 100, sort_key: sort_key, sort_order: 'desc', feed_onestop_id: params['feed_id'] })

    let adapter = this.get('store').adapterFor('feed');
    let feedVersionUpdateStatistics = adapter.ajax(adapter.urlForFindRecord(params['feed_id'], 'feeds') + '/feed_version_update_statistics');

    let self = this;
    return Ember.RSVP.hash({
      feed: feed,
      feedVersions: feedVersions,
      routeGeometryIssues: routeGeometryIssues,
      stationHierarchyIssues: stationHierarchyIssues,
      feedVersionUpdateStatistics: feedVersionUpdateStatistics
    }).then(function (model) {
      let i = model.feedVersions.map(function(i){return i.id});
      let feedVersionInfoStatistics = (i.length == 0 ? [] : self.store.query('feed-version-info', {'feed_version_sha1': i.join(','), type: 'FeedVersionInfoStatistics', per_page: false} ));
      return Ember.RSVP.hash({
        feed: model.feed,
        feedVersions: model.feedVersions,
        routeGeometryIssues: routeGeometryIssues,
        stationHierarchyIssues: stationHierarchyIssues,
        feedVersionInfoStatistics: feedVersionInfoStatistics,
        feedVersionUpdateStatistics: feedVersionUpdateStatistics
      })
    })
  },
  actions: {
    feedFetchStarted: function() {
      this.refresh();
    }
  }
});
