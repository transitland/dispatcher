import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    issueClicked: function(issue) {
      this.set('model.selectedIssue', issue);
    }
  }
});
