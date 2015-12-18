import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('change-payload', params['change_payload_id']);
  },
  actions: {
    update: function() {
      var self = this;
      var model = this.currentModel;
      var changeset = model.get('changeset');
      model.set('payload', JSON.parse(model.get('stringified_payload')));
      model.save().then(function() {
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        alert(error.message);
      });
    }
  }
});
