import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let feed = this.store.findRecord('feed', params['feed_id'], params);
    let routeGeometryIssues = this.store.query('issue', { of_feed_entities: params['feed_id'], category: 'route_geometry', per_page: 0, total: true });
    return Ember.RSVP.hash({
      feed: feed,
      routeGeometryIssues: routeGeometryIssues
    });
  }
});
