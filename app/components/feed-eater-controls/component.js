import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    enqueue: function(importLevel) {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.get('feedVersion').enqueue(importLevel)
      .then( () => {
        flashMessages.success('Successfully enqueued feed version for import!');
      }).catch( () => {
        flashMessages.danger('Error enqueuing feed version for import.');
      });
    }
  }
});
