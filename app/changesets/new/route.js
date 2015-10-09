import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('changeset', {
      notes: '',
      payload: '{"changes": []}'
    });
  },
  actions: {
    create: function() {
      var self = this;
      var changeset = self.currentModel;
      changeset.save().then(function() {
        self.transitionTo('changesets.show', changeset);
      });
    }
  }
});
