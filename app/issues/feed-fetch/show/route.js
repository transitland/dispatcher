import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';

export default Ember.Route.extend(IssuesRoute, {
  model: function(params) {
    this.store.unloadAll('changeset');
    this.store.unloadAll('change_payload');
    let changeset = this.store.createRecord('changeset', {
      notes: 'Issue resolution:'
    });
    changeset.get('change_payloads').createRecord();
    let self = this;
    return self.store.findRecord('issue', params['issue_id']).then(function(selectedIssue){
      let feed_id = selectedIssue.get('entities_with_issues').get('firstObject').onestop_id;
      return Ember.RSVP.hash({
        selectedIssue: selectedIssue,
        feed: self.store.findRecord('feed', feed_id),
        changeset: changeset
      });
    });
  }
});
