import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.find('change-payload', params['change_payload_id']);
  },
  actions: {
    delete: function() {
      var self = this;
      var model = self.currentModel;
      var changeset = model.get('changeset');
      const flashMessages = Ember.get(this, 'flashMessages');
      model.destroyRecord().then(() => {
        flashMessages.add({
          message: 'Change payload deleted!',
          type: 'success',
          sticky: true
        });
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.add({
          message: `Error(s) deleting change payload: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    },
    update: function() {
      var self = this;
      var model = self.currentModel;
      var changeset = model.get('changeset');
      const flashMessages = Ember.get(this, 'flashMessages');
      model.set('payload', JSON.parse(model.get('stringified_payload')));
      model.save().then(function() {
        flashMessages.add({
          message: "Change payload updated!",
          type: 'success',
          sticky: true
        });
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.add({
          message: `Error(s) updating change payload: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
