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
  lat: 0,
  lng: 0,
  zoom: 0,
  bounds: null,
  actions: {
    updateView(e) {
      console.log('stop-map updateView');
      let center = e.target.getCenter();
      var zoom = e.target.getZoom();
      var bounds = e.target.getBounds();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
      this.set('zoom', zoom);
      this.set('bbox', bounds.toBBoxString());
    },
    updateStopLocation(stop, e) {
      console.log('stop-map updateStopLocation: ', stop.id);
      let location = e.target.getLatLng();
      stop.setCoordinates([location.lng, location.lat]);
    }
  }
});
