import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    issueClicked: function(issue) {
      this.sendAction('issueClicked', issue);
    }
  }
});
