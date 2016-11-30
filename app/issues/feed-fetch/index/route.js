import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';

export default Ember.Route.extend(IssuesRoute, {
  issueTypes: ['all', 'feed_fetch_invalid_source',
                    'feed_fetch_invalid_zip',
                    'feed_fetch_invalid_url',
                    'feed_fetch_invalid_response'],

  model: function(params) {
    console.log(params);
    var self = this;
    if (!('issue_type' in params) || ['all', ''].includes(params['issue_type']) ) params['issue_type'] = self.issueTypes.join(',')
    let issues = this.store.query('issue', params);
    return Ember.RSVP.hash({
      issues: issues,
      issueTypes: self.issueTypes
    });
  }
});
