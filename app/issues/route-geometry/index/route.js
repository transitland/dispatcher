import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(IssuesRoute, PaginatedSortableRoute, {

  issueTypes: ['all', 'stop_rsp_distance_gap',
                    'distance_calculation_inaccurate',
                    'rsp_line_inaccurate',
                    'stop_position_inaccurate'],

  model: function(params) {
    this.handleAllIssueTypes(params);
    let issues = this.store.query('issue', params);
    var self = this;
    return Ember.RSVP.hash({
      issues: issues,
      issueTypes: self.issueTypes,
      bounds: L.latLngBounds([L.latLng(37.77, -122.4), L.latLng(37.76,-122.5)])
    });
  }
});
