import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';

export default Ember.Route.extend(IssuesRoute, {
  issueTypes: ['all', 'feed_fetch_invalid_source',
                    'feed_fetch_invalid_zip',
                    'feed_fetch_invalid_url',
                    'feed_fetch_invalid_response'],

  model: function(params) {
    this.store.unloadAll('changeset');
    this.store.unloadAll('change_payload');
    this.allIssueTypes(params);
    let issues = this.store.query('issue', params);
    let changeset = this.store.createRecord('changeset', {
      notes: 'Issue resolution:'
    });
    changeset.get('change_payloads').createRecord();
    let self = this;
    return this.store.query('issue', params).then(function(issues){
      return self.store.findRecord('issue', params['issue_id']).then(function(selectedIssue){
        let feed_id = selectedIssue.get('entities_with_issues').get('firstObject').onestop_id;
        return Ember.RSVP.hash({
          issues: issues,
          selectedIssue: selectedIssue,
          issueTypes: self.issueTypes,
          feed: self.store.findRecord('feed', feed_id),
          changeset: changeset
        });
      });
    });
  }
});
