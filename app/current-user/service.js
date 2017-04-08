import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  user: null,

  load() {
    let userId = this.get('session.data.authenticated.user.id');
    if (Ember.isPresent(userId)) {
      return this.get('store').findRecord('user', userId).then((user) => {
        this.set('user', user);
      }).catch(() => {
        this.get('session').invalidate()
      });
    } else {
      return Ember.RSVP.resolve();
    }
  }
});
