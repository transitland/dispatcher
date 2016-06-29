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
      var changes = this
        .store
        .peekAll('stop-station')
        .filter(function(stop) {
          return stop.get('hasDirtyAttributes')
        })
        .map(function(stop) {
          return stop.toChange();
        });
      console.log(changes);
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
