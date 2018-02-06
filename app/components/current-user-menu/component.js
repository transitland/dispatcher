import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['nav','navbar-nav','navbar-right'],
  session: service(),
  currentUser: service(),
  actions: {
    signOut() {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.success("Signed out.");
      this.get('session').invalidate();
    }
  }
});
