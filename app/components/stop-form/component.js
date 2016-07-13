import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    newPlatform: function() {
      return this.stop.newPlatform();
    },
    newEgress: function() {
      console.log('stop-form newEgress');
    },
  }
});
