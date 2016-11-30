import Ember from 'ember';

export default Ember.Component.extend({
  message: '',
  newIssues: [],
  actions: {
    toggleApplyMessage() {
      this.sendAction('toggleApplyMessage');
    }
  }
});
