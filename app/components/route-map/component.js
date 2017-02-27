import Ember from 'ember';

export default Ember.Component.extend({
  url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  options: {
  },
  draw: false,
  editing: false,
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
      this.set('editing', false);
    },
    actionDrawEditStart: function(EditedEvent) {
      this.set('editing', true);
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
