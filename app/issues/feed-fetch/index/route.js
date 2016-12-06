import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';

export default Ember.Route.extend(IssuesRoute, {
  issueTypes: ['all', 'feed_fetch_invalid_source',
                    'feed_fetch_invalid_zip',
                    'feed_fetch_invalid_url',
                    'feed_fetch_invalid_response'],

  model: function(params) {
    this.allIssueTypes(params);
    let issues = this.store.query('issue', params, { reload: true });
    let issueTypes = this.issueTypes;
    return Ember.RSVP.hash({
      issues: issues,
      issueTypes: issueTypes
    });
  }
});
