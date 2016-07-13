import Ember from 'ember';

export default Ember.Component.extend({
  color: Ember.computed(function(){
    return '#000';
  }),

  actions: {
    rspAdded: function(addEvent) {
      this.sendAction('rspAdded', addEvent.target._leaflet_id, this.get('onestop_id'));
    }
  }
});
