import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      //operators: this.store.query('operator',params),
      stops: this.store.query('stop',params),
      //routes: this.store.query('route',params),
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
