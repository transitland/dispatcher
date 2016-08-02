import Ember from 'ember';

export default Ember.Route.extend({
  // this is temporary
  beforeModel: function(transition){
    this.set('feed_onestop_id', transition.params['issues.new'].feed_id);
  },
  model: function(params) {
    params['imported_from_feed'] = this.get('feed_onestop_id');
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
