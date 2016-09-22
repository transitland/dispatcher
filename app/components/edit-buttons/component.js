import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    showChangeset() {
      this.sendAction('showChangeset');
    },
    closeDialog() {
      this.sendAction('closeDialog');
    }
  }
});
