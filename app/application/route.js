import Ember from 'ember';

export default Ember.Route.extend({
  didTransition: function() {
    this._super();
    // always scroll to the top of the page after transitioning to a new route
    window.scrollTo(0,0);
  }
});
