import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    issueClicked: function(issue) {
      this.transitionToRoute('issues.route-geometry.show', issue.id);
    }
  }
});
