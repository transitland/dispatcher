import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      stops: this.store.query('stop', params),
      route_stop_patterns: this.store.query('route_stop_pattern',params)
    });
  },
  actions: {
    saveIssue(issueData) {
      let issue = this.store.createRecord('issue', issueData);
      issue.save();
    }
  }
});
