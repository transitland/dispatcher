import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['feed_onestop_id'],
  actions: {
    issueClicked: function(issue) {
      this.transitionToRoute('issues.route-geometry.show', issue.id);
    }
  }
});
