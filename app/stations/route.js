import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(PaginatedSortableRoute, {
  queryParams: {
    lat: {
      replace: true,
    },
    lng: {
      replace: true,
    },
    zoom: {
      replace: true
    },
    bbox: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.query('stop-station', params);
  }
});
