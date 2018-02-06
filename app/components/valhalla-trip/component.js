import Ember from 'ember';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Ember.Component.extend({
  valhalla_route: inject.service('valhalla-route'),
  tagName: 'td',
  classNameBindings: ['failure:danger', 'success:success'],
  origin: null,
  destination: null,
  departure_date_time: null,
  transit_maneuvers: computed('trip', function() {
    return this.get('trip').legs[0].maneuvers.filter(function(maneuver) {
      return maneuver.travel_mode === 'transit';
    });
  }),
  pedestrian_maneuvers: computed('trip', function() {
    return this.get('trip').legs[0].maneuvers.filter(function(maneuver) {
      return maneuver.travel_mode === 'pedestrian';
    });
  }),
  trip: computed(function() {
    // http://valhalla.github.io/demos/routing/index.html#loc=13,40.748622,-73.969316&locations=[{"lat":40.81095093393647,"lon":-73.95240783691405},{"lat":40.75011800153818,"lon":-73.99394989013672}]&costing="multimodal"&costingoptions={"transit":{"use_bus":"0.3","use_rail":"0.6","use_transfers":"0.3"}}&directionsoptions={"language":"en-US"}&datetime={"type":0}
    var self = this;
    var origin = this.get('origin');
    var destination = this.get('destination');
    var departure_date_time = this.get('departure_date_time');
    if (!this.get('origin') || !this.get('destination')) {
      console.log("Problem with origin/destination: skipping");
      return;
    }
    var valhalla = this.get('valhalla_route');
    var route_params = valhalla.route_params(
      origin.get('geometry').coordinates,
      destination.get('geometry').coordinates,
      departure_date_time
    );
    var route_url = valhalla.get_url(route_params);
    var route_url_lrm = valhalla.get_url_lrm(route_params);
    this.set('route_url', route_url);
    this.set('route_url_lrm', route_url_lrm);

    // Request
    valhalla.add(
      route_url,
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
