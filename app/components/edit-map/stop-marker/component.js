import Ember from 'ember';

export default Ember.Component.extend({
  onestop_id: '',

  actions: {
    stopAdded: function(addEvent) {
      this.sendAction('stopAdded', addEvent.target._leaflet_id, this.get('onestop_id'));
    }
  }
});
