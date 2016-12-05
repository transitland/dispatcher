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
    var self = this;
    return self.store.find('issue', params['issue_id']).then(function(selectedIssue){
      self.allIssueTypes(params);
      let issues = self.store.query('issue', params);
      let changeset = self.store.createRecord('changeset', {
        notes: 'Issue resolution:'
      });
      let feed_id = null;
      selectedIssue.get('entities_with_issues').forEach(function(entity){
        feed_id = entity.onestop_id
      });
      changeset.get('change_payloads').createRecord();
      return Ember.RSVP.hash({
        issues: issues,
        selectedIssue: selectedIssue,
        issueTypes: self.issueTypes,
        feed: self.store.findRecord('feed', feed_id),
        changeset: changeset
      });
    });
  }
});
