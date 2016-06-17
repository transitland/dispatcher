import Ember from 'ember';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Ember.Controller.extend(PaginatedSortableController, {
  lat: 37.78948,
  lng: -122.39710,
  zoom: 10,
  actions: {
    updateCenter(e) {
      let center = e.target.getCenter();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
    },
    updateLocation(r, e) {
      let location = e.target.getLatLng();
      Ember.setProperties(r, {
        lat: location.lat,
        lng: location.lng
      });
    }
  }
});
