import Ember from 'ember';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';
/* global L */

export default Ember.Controller.extend(PaginatedSortableController, {
  lat: 37.78990,
  lng: -122.39310,
  zoom: 14,
  per_page: 10,
  actions: {
    saveStops() {
    },
    updateBounds(bounds) {
      this.set('bbox', bounds.toBBoxString());
    },
    updateView(lat, lng, zoom) {
      this.set('lat', lat);
      this.set('lng', lng);
      this.set('zoom', zoom);
    }
  }
});
