import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  didTransition: function() {
    this._super();
    // always scroll to the top of the page after transitioning to a new route
    window.scrollTo(0,0);
  },

  // https://github.com/simplabs/ember-simple-auth/blob/master/guides/managing-current-user.md#loading-the-current-user
  currentUser: inject.service(),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('currentUser').load();
  }
});
