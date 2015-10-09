import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('changeset', params['changeset_id']);
  },
  actions: {
    apply: function() {
      var self = this;
      var changeset = self.currentModel;
      changeset.apply().then(function() {
        changeset.reload();
      });
    }
  }
});
