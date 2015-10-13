import Ember from 'ember';

var LOCALSTORAGE_KEY = 'transitland-dispatcher-auth-token';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  authToken: Ember.computed.alias('session.authToken'),
  readStoredAuthToken: function() {
    this.set('authToken', localStorage.getItem(LOCALSTORAGE_KEY));
  }.on('init'),
  actions: {
    change: function(value) {
      localStorage.setItem(LOCALSTORAGE_KEY, value);
    }
  }
});
