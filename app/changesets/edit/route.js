import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    let changeset = this.store.find('changeset', params['changeset_id']);
    let users = this.store.query('user', { per_page: false });
    return Ember.RSVP.hash({
      changeset: changeset,
      users: users
    });
  },
  actions: {
    delete: function() {
      let self = this;
      let changeset = self.currentModel.changeset;
      const flashMessages = Ember.get(this, 'flashMessages');
      changeset.destroyRecord().then(() => {
        flashMessages.add({
          message: "Changeset deleted!",
          type: 'success',
          sticky: true
        });
        self.transitionTo('changesets');
      }).catch(function(error) {
        flashMessages.add({
          message: `Error(s) deleting changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    },
    update: function() {
      const flashMessages = Ember.get(this, 'flashMessages');
      let self = this;
      let changeset = self.currentModel.changeset;
      changeset.save().then(function() {
        flashMessages.add({
          message: "Changeset updated!",
          type: 'success',
          sticky: true
        });
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.add({
          message: `Error(s) updating changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
