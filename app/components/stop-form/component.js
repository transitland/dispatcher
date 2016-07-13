import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    newPlatform: function() {
      console.log('stop-form newPlatform');
    },
    newEgress: function() {
      console.log('stop-form newEgress');
    },
  }
});
