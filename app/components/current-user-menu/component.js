import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    signOut() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.success("Signed out.");
      this.get('session').invalidate();
    }
  }
});
