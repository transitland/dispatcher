import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      feeds: this.store.findAll('feed', { per_page: '∞' })
    });
  }
});
