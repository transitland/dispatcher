import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(IssuesRoute, PaginatedSortableRoute, {
  model: function(params) {
    params['category'] = 'route_geometry';
    let issues = this.store.query('issue', params);
    return Ember.RSVP.hash({
      issues: issues,
      bounds: L.latLngBounds([L.latLng(37.77, -122.4), L.latLng(37.76,-122.5)])
    });
  }
});
