import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  identification: null,
  password: null,

  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password');
      var authenticator = 'authenticator:jwt';

      this.get('session').authenticate(authenticator, credentials);
    }
  }
});
