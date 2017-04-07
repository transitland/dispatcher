import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  didTransition: function() {
    this._super();
    // always scroll to the top of the page after transitioning to a new route
    window.scrollTo(0,0);
  },

  // https://github.com/simplabs/ember-simple-auth/blob/master/guides/managing-current-user.md#loading-the-current-user
  currentUser: Ember.inject.service(),

  beforeModel() {
    console.log('beforeModel');
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    console.log('sessAuth');
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  }
});
