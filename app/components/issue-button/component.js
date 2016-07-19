import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["issue-button"],
  actions: {
    issueClicked: function(issue) {
      this.sendAction('issueClicked', issue);
    }
  }
});
