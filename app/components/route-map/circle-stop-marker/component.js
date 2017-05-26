import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    popupOpen: function(e) {
      let content = "<p>Stop: " + this.get('onestop_id') + "</p><p>Sequence: " + this.get('sequence') + "</p><p>Distance: <b>"+ this.get('distance') + "</b></p>"
      e.popup.setContent(content);
    }
  }
});
