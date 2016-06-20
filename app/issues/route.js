import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var issues = this.store.query('issue', params);
    return Ember.RSVP.hash({
      issues: issues
    });
  },

  actions: {
    issueClicked: function(issue) {
      //this.set('issue', issue);
    }
  }
});
