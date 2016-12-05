import Ember from 'ember';

export default Ember.Mixin.create({

  queryParams: {
    issue_type: {
      refreshModel: true
    }
  },

  allIssueTypes: function(params) {
    if (!('issue_type' in params) || params['issue_type'] === 'all' || params['issue_type'] === '')
      params['issue_type'] = this.issueTypes.join(',')
  },

  model: function(params) {
    this.allIssueTypes(params);
    let issues = this.store.query('issue', params);
    var self = this;
    return Ember.RSVP.hash({
      issues: issues,
      issueTypes: self.issueTypes
    });
  }
});
