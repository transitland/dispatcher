import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('changeset', params['changeset_id']);
  },
  actions: {
    update: function() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var self = this;
      var changeset = self.currentModel;
      changeset.save().then(function() {
        flashMessages.success("Changeset updated!");
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.danger(`Error(s) updating changeset: ${error.message}`);
      });
    }
  }
});
