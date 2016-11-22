import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let feed = this.store.findRecord('feed', params['feed_id'], params);
    let changeset = this.store.createRecord('changeset', {
      notes: 'Issue resolution:'
    });
    changeset.get('change_payloads').createRecord();
    return Ember.RSVP.hash({
      feed: feed,
      changeset: changeset
    });
  }
});
