import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let feed = this.store.findRecord('feed', params['feed_id'], params);
    let issue_types = ['feed_fetch_invalid_source', 'feed_fetch_invalid_zip', 'feed_fetch_invalid_response', 'feed_fetch_invalid_url']
    let issues = this.store.query('issue', { of_entity: params['feed_id'], issue_type: issue_types.join(',') } );
    let changeset = this.store.createRecord('changeset', {
      notes: 'Issue resolution:'
    });
    changeset.get('change_payloads').createRecord();
    return Ember.RSVP.hash({
      feed: feed,
      issues: issues,
      changeset: changeset
    });
  }
});
