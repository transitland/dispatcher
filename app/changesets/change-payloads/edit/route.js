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
      const flashMessages = Ember.get(this, 'flashMessages');
      model.set('payload', JSON.parse(model.get('stringified_payload')));
      model.save().then(function() {
        flashMessages.success("Change payload updated!");
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.danger(`Error(s) updating change payload: ${error.message}`);
      });
    }
  }
});
