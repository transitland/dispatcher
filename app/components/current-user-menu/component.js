import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['nav','navbar-nav','navbar-right'],
  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  actions: {
    signOut() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.success("Signed out.");
      this.get('session').invalidate();
    }
  }
});
