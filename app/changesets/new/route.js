import Ember from 'ember';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model: function(params) {
    let payload = {};
    if (params.payload) {
      payload = JSON.parse(decodeURI(params.payload));
    }
    let changeset = this.store.createRecord('changeset', {
      user: this.get('currentUser.user'),
      notes: params.notes
    });
    changeset.get('change_payloads').createRecord({
      payload: payload
    });
    return changeset;
  },
  actions: {
    create: function() {
      let self = this;
      let changeset = self.currentModel;
      const flashMessages = Ember.get(this, 'flashMessages');
      changeset.save().then(function() {
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.add({
          message: `Error(s) creating changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });

    }
  }
});
