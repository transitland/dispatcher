import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'dispatcher/config/environment';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  host: ENV.datastoreHost,
  namespace: 'api/v1',
  headers: Ember.computed('session.authToken', function() {
    return {
      'Authorization': `Token token=${this.get("session.authToken")}`
    };
  })
});
