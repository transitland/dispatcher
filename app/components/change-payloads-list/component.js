import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteChangePayload: function(changePayload) {
      const flashMessages = Ember.get(this, 'flashMessages');
      changePayload.destroyRecord().then(() => {
        flashMessages.success("Change payload deleted!");
      }).catch(function(error) {
        flashMessages.danger(`Error(s) deleting change payload: ${error.message}`);
      });
    }
  }
});
