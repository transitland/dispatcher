import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    newPlatform: function() {
      this.stop.set('isOpen', false);
      var platform = this.stop.newPlatform();
      platform.set('isOpen', true);
    },
    newEgress: function() {
      console.log('stop-form newEgress');
    },
  }
});
