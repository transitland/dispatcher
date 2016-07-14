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

  isEntity: function(layer) {
    if (layer.hasOwnProperty('editing')) {
      if (layer.hasOwnProperty('options')) {
        if (layer.options.hasOwnProperty('title') && layer.options.title !== "") {
          return true;
        }
        else if (layer.hasOwnProperty('_latlngs')) {
          return true;
        }
      }
    }
    return false;
  },

  actions: {
    actionLayeradd: function(addEvent) {
      if (this.isEntity(addEvent.layer)) {
        this.get('edit.featureGroup').addLayer(addEvent.layer);
      }
    },
    actionLayerremove: function(addEvent) {
      if (this.isEntity(addEvent.layer)) {
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
