import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('user', params['user_id']);
  },
  actions: {
    update: function() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var self = this;
      var user = self.currentModel;
      user.save().then(function() {
        flashMessages.success("User updated!");
        self.transitionTo('users.show', user);
      }).catch(function(error) {
        flashMessages.danger(`Error(s) updating user: ${error.message}`);
      });
    }
  }
});
