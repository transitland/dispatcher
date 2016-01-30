import Ember from 'ember';
import ENV from 'dispatcher/config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  authToken: Ember.computed.alias('session.authToken'),
  readStoredAuthToken: function() {
    this.set('authToken', localStorage.getItem(ENV.AUTH_TOKEN_LOCALSTORAGE_KEY));
  }.on('init'),
  actions: {
    change: function(value) {
      localStorage.setItem(ENV.AUTH_TOKEN_LOCALSTORAGE_KEY, value);
    }
  }
});
