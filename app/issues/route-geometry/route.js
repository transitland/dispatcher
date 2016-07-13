import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    var issues = this.store.query('issue', params);
    return Ember.RSVP.hash({
      issues: issues,
      selectedIssue: null,
      issueRouteStopPatterns: null,
      issueStops: null
    });
  }
});
