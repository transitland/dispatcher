import Ember from 'ember';
import ENV from 'dispatcher/config/environment';

export default Ember.Service.extend({
  authToken: null,
  getAuthToken: function() {
    if (this.get('authToken') !== null) {
      return this.get('authToken');
    } else {
      return localStorage.getItem(ENV.AUTH_TOKEN_LOCALSTORAGE_KEY);
    }
  }
});
