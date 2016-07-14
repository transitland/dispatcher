import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    switchPopup: function(entity) {
      this.stop.set('isOpen', false);
      entity.set('isOpen', true);
    },
    newPlatform: function() {
      this.stop.set('isOpen', false);
      var entity = this.stop.newPlatform();
      entity.set('isOpen', true);
    },
    newEgress: function() {
      this.stop.set('isOpen', false);
      var entity = this.stop.newEgress();
      entity.set('isOpen', true);
    },
  }
});
