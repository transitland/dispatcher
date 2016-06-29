import Ember from 'ember';

export default Ember.Component.extend({
  valhalla_route: Ember.inject.service('valhalla-route'),
  tagName: 'td',
  classNameBindings: ['failure:danger', 'success:success'],
  origin: null,
  destination: null,
  departure_date_time: null,
  trip: Ember.computed(function() {
    var self = this;
    this.get('valhalla_route').add(
      this.get('origin').get('geometry').coordinates,
      this.get('destination').get('geometry').coordinates,
      this.get('departure_date_time'),
      function(result) {
        self.set('success', true);
        self.set('trip', result.trip);
      },
      function(failure) {
        self.set('failure', failure);
      }
    );
  })
});
