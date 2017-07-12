import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Component.extend({
  onestop_id: '',
  markerStopIcon: L.icon({
    iconUrl: config.rootURL + 'assets/images/search-active.png',
    iconSize: [36, 54],
    iconAnchor: [18, 54],
    popupAnchor: [0, -54]
  }),
  actions: {
    stopAdded: function(addEvent) {
      this.sendAction('stopAdded', addEvent.target._leaflet_id, this.get('onestop_id'));
    },
    popupOpen: function(e) {
      let content = "<p>Stop: " + this.get('onestop_id') + "</p><p>Sequence: " + this.get('sequence') + "</p><p>Distance: <b>"+ this.get('distance') + "</b></p>"
      e.popup.setContent(content);
    }
  }
});
