import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let changeset = this.store.createRecord('changeset', {
      notes: ''
    });
    changeset.get('change_payloads').createRecord();
    let users = this.store.query('user', { per_page: false });
    return Ember.RSVP.hash({
      changeset: changeset,
      users: users
    });
  },
  actions: {
    create: function() {
      let self = this;
      let changeset = self.currentModel.changeset;
      const flashMessages = Ember.get(this, 'flashMessages');
      changeset.save().then(function() {
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.danger(`Error(s) creating changeset: ${error.message}`);
      });

    }
  }
});
