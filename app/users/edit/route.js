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
        flashMessages.add({
          message: "User updated!",
          type: 'success',
          sticky: true
        });
        self.transitionTo('users.show', user);
      }).catch(function(error) {
        flashMessages.add({
          message: `Error(s) updating user: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
