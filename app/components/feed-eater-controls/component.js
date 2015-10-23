import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    enqueue: function(importLevel) {
      this.get('feedVersion').enqueue(importLevel);
    }
  }
});
