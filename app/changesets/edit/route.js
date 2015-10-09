import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('changeset', params['changeset_id']);
  },
  actions: {
    update: function() {
      var self = this;
      var changeset = self.currentModel;
      var newPayload = JSON.parse(changeset.get('stringified_payload'));
      changeset.set('payload', newPayload);
      changeset.save().then(function() {
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        debugger
        ''
      });
    }
  }
});
