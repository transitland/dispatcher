import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('user', {});
  },
  actions: {
    create: function() {
      var self = this;
      var user = self.currentModel;
      user.save().then(function() {
        self.transitionTo('users.show', user);
      });
    }
  }
});
