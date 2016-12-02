import Ember from 'ember';

export default Ember.Component.extend({
  message: '',
  newIssues: [],
  actions: {
    closeApplyMessage() {
      this.sendAction("closeApplyMessage");
    }
  }
});
