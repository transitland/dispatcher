import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    issueClicked: function(issue) {
      console.log(issue);
      this.sendAction('issueClicked', issue);
    },
    showChangeset: function() {
      this.sendAction('showChangeset');
    },
    closeDialog: function() {
      this.sendAction('closeDialog');
    }
  }
});
