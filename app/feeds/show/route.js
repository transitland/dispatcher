import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let feed = this.store.findRecord('feed', params['feed_id'], params);
    let routeGeometryTypes = ['stop_position_inaccurate', 'stop_rsp_distance_gap', 'distance_calculation_inaccurate', 'rsp_line_inaccurate'];
    let routeGeometryIssues = this.store.query('issue', { feed_onestop_id: params['feed_id'], issue_type: routeGeometryTypes.join(','), per_page: 0, total: true });
    return Ember.RSVP.hash({
      feed: feed,
      routeGeometryIssues: routeGeometryIssues
    });
  }
});
