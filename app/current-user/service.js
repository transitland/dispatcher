import Ember from 'ember';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Ember.Service.extend({
  session: service(),
  store: service(),
  user: null,

  load() {
    let userId = this.get('session.data.authenticated.user.id');
    if (isPresent(userId)) {
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
