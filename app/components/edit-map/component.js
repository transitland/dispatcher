import Ember from 'ember';

export default Ember.Component.extend({
  lat: 37.77,
  lng: -122.4,
  url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  zoom: 12,
  options: {
    drawControl: true
  },

  actions: {
    actionLayeradd: function(addEvent) {
      try {
        this.set('bounds', L.latLngBounds(addEvent.layer.getLatLngs()));
      } catch (e) {

      }
    }
  }
});
