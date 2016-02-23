import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let changeset = this.store.find('changeset', params['changeset_id']);
    let users = this.store.findAll('user');
    return Ember.RSVP.hash({
      changeset: changeset,
      users: users
    });
  },
  actions: {
    update: function() {
      const flashMessages = Ember.get(this, 'flashMessages');
      let self = this;
      let changeset = self.currentModel.changeset;
      changeset.save().then(function() {
        flashMessages.success("Changeset updated!");
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.danger(`Error(s) updating changeset: ${error.message}`);
      });
    }
  }
});
