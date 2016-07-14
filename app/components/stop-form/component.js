import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
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
