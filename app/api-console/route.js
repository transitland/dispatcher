import Ember from 'ember';
import ENV from 'dispatcher/config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  setupController(controller) {
    let token = this.get("session").getAuthToken();
    let authHeader = `Token token=${token}`;
    controller.set('authorizations', {
      name: 'Authorization',
      value: authHeader,
      type: 'header'
    });
    let swaggerJsonUrl = `${ENV.datastoreHost}/api/v1`;
    controller.set('swaggerJsonUrl', swaggerJsonUrl);
  }
});
