import Ember from 'ember';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';
/* global L */

var stopPlatformIcon = L.icon({
    iconUrl: 'assets/images/marker-icon.png',
    iconRetinaUrl: 'assets/images/marker-icon-2x.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowRetinaUrl: 'my-icon-shadow@2x.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

export default Ember.Controller.extend(PaginatedSortableController, {
  lat: 37.32955,
  lng: -121.90311,
  zoom: 14,
  bbox: null,
  per_page: 10,
  stopIconTest: stopPlatformIcon,
  actions: {
    saveStops() {
    },
    updateView(e) {
      var bounds = e.target.getBounds();
      console.log("Updated view: ", bounds);
      this.set('bbox', bounds.toBBoxString());
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
