import Ember from 'ember';
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

export default Ember.Component.extend({
  stopIconTest: stopPlatformIcon,
  actions: {
    updateView(e) {
      let center = e.target.getCenter();
      var zoom = e.target.getZoom();
      var bounds = e.target.getBounds();
      this.get('onView')(center.lat, center.lng, zoom);
      this.get('onBounds')(bounds);
    },
    updateLocation(r, e) {
      console.log('updateLocation:', r.id);
      let location = e.target.getLatLng();
      Ember.setProperties(r, {
        lat: location.lat,
        lng: location.lng
      });
    }
  }
});
