import Ember from 'ember';

export default Ember.Component.extend({
  url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  options: {},
  draw: { polyline: false, polygon: false, rectangle: false, circle: false, marker: false },
  editing: false,
  edit: {
    featureGroup: L.featureGroup()
  },
  enableDeleting: false,
  willDestroyElement: function() {
    this._super(...arguments);
    // removeLayer event on individual layers doesn't seem to work for the purpose
    // of clearing the edit featureGroup, but this does.
    Object.values(this.get('edit.featureGroup')._layers).forEach(function(layer){
      this.get('edit.featureGroup').removeLayer(layer);
    }, this);
  },
  actions: {
    actionDrawEdited: function(EditedEvent) {
      this.sendAction('actionDrawEdited', EditedEvent);
      this.set('editing', false);
    },
    actionDrawEditStart: function(EditedEvent) {
      this.set('editing', true);
    },
    actionDrawEditStop: function(EditedEvent) {
      this.set('editing', false);
    },
    editEntityAdded: function(layer, onestop_id) {
      this.get('edit.featureGroup').addLayer(layer);
      this.sendAction('editEntityAdded', layer._leaflet_id, onestop_id);
    }
  }
});
