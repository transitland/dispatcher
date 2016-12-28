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
        flashMessages.add({
          message: "Changeset applied!",
          type: 'success',
          sticky: true
        });
        changeset.reload();
      }).catch((error) => {
        flashMessages.add({
          message: `Error(s) applying changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
