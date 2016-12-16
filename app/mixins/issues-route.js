import Ember from 'ember';

export default Ember.Mixin.create({

  queryParams: {
    issue_type: {
      refreshModel: true
    }
  },

  handleAllIssueTypes: function(params) {
    if (!('issue_type' in params) || params['issue_type'] === 'all' || params['issue_type'] === '')
      params['issue_type'] = this.issueTypes.join(',')
  }
});
