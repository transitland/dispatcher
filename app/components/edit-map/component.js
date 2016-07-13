import Ember from 'ember';

export default Ember.Component.extend({
  lat: 37.77,
  lng: -122.4,
  url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  zoom: 12,
  options: {
  },
  draw: false,
  edit: {
    featureGroup: L.featureGroup()
  },

  actions: {
    actionLayeradd: function(addEvent) {
      if (addEvent.layer.hasOwnProperty('editing')) {
        this.get('edit.featureGroup').addLayer(addEvent.layer);
      }
      try {
        this.set('bounds', new L.latLngBounds(addEvent.layer.getLatLngs()));
      } catch (e) {

      }
    },
    actionLayerremove: function(addEvent) {
      if (addEvent.layer.hasOwnProperty('editing')) {
        this.get('edit.featureGroup').removeLayer(addEvent.layer);
      }
    },
    actionDrawEdited: function(EditedEvent) {
      this.sendAction('actionDrawEdited', EditedEvent);
    },
    // TODO: consolidate these?
    stopAdded: function(leafletId, onestop_id){
      this.sendAction('stopAdded', leafletId, onestop_id);
    },
    rspAdded: function(leafletId, onestop_id){
      this.sendAction('rspAdded', leafletId, onestop_id);
    }
  }
});
