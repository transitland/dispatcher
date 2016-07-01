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
    saveStops() {
      console.log('stop-map saveStops');
      var changes = this.stops
        .filter(function(stop) {
          return stop.get('hasDirtyAttributes')
        })
        .map(function(stop) {
          return stop.toChange();
        });
      var changeset = {
        changes: changes.map(function(change){return {action: 'createUpdate', change: change}})
      }
      console.log(JSON.stringify(changeset));
    },
    setBounds() {
      console.log('stop-map setBounds');
      this.set('bbox', this.get('bounds').toBBoxString());
    },
    updateView(e) {
      console.log('stop-map updateView');
      let center = e.target.getCenter();
      var zoom = e.target.getZoom();
      var bounds = e.target.getBounds();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
      this.set('zoom', zoom);
      this.set('bounds', bounds);
    },
    updateStopLocation(stop, e) {
      console.log('stop-map updateStopLocation');
      let location = e.target.getLatLng();
      stop.setCoordinates([location.lng, location.lat]);
    }
  }
});
