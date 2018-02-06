import { inject } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: inject.service(),

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
