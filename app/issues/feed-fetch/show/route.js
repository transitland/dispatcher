import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';

export default Ember.Route.extend(IssuesRoute, {
  currentUser: Ember.inject.service(),
  model: function(params) {
    this.store.unloadAll('changeset');
    this.store.unloadAll('change_payload');
    let changeset = this.store.createRecord('changeset', {
      user: this.get('currentUser.user'),
      notes: 'Issue resolution:'
    });
    changeset.get('change_payloads').createRecord();
    let users = this.store.query('user', { per_page: false });
    let self = this;
    return self.store.findRecord('issue', params['issue_id'], { reload: true }).then(function(selectedIssue){
      let feed_id = selectedIssue.get('entities_with_issues').get('firstObject').get('onestop_id');
      let feed = self.store.findRecord('feed', feed_id);
      return Ember.RSVP.hash({
        selectedIssue: selectedIssue,
        feed: feed,
        changeset: changeset,
        users: users
      });
    });
  }
});
