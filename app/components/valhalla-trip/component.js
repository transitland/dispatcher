import Ember from 'ember';

// Return a Valhalla Promise.
function getRoute(origin_coords, destination_coords, departure_date_time, api_key) {
  var api_key = 'valhalla-j47Cp10';
  var url = 'https://valhalla.mapzen.com/route';
  var params = {
    locations: [
      {lon: origin_coords[0], lat: origin_coords[1], type: 'break'},
      {lon: destination_coords[0], lat: destination_coords[1], type: 'break'}
    ],
    costing: 'multimodal',
    costing_options: {
      transit: {
        use_bus: 0.3,
        use_rail: 0.6,
        use_transfers: 0.3
      }
    },
    date_time: {
      type: 0,
      value: departure_date_time.toISOString()
    }
  }
  return Ember.$.getJSON(url, {
    json: JSON.stringify(params),
    api_key: api_key
  });
}

export default Ember.Component.extend({
  trip: null,
  origin: null,
  destination: null,
  departure_date_time: null,
  getTrip: function() {
    var self = this;
    getRoute(
      self.get('origin').get('geometry').coordinates,
      self.get('destination').get('geometry').coordinates,
      self.get('departure_date_time')
    ).then(function(result) {
      self.set('trip', result.trip);
    }, function(failure) {
      self.set('trip', {failed: true});
    });
  }.property('getTrips')
});
