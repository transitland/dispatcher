import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  authToken: Ember.computed.alias('session.authToken')
});
