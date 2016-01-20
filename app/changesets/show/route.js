import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('changeset', params['changeset_id']);
  },
  actions: {
    apply: function() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var self = this;
      var changeset = self.currentModel;
      changeset.apply().then(() => {
        flashMessages.success("Changeset applied!");
        changeset.reload();
      }).catch((error) => {
        flashMessages.danger(`Error(s) applying changeset: ${error.message}`);
      });
    }
  }
});
