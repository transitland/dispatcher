import Ember from 'ember';
import ENV from 'dispatcher/config/environment';

export default Ember.Service.extend({
  queue: [],
  rate_limit: ENV.valhallaRateLimit,
  api_key: ENV.valhallaApiKey,
  url: ENV.valhallaHost,
  run() {
    var job = this.get('queue').shift();
    return this.getRoute(
      job[0],
      job[1],
      job[2]
    ).then(function(trip){
      job[3](trip);
    }, function(failure) {
      job[4](failure);
    });
  },
  poll() {
    // Run the throttled function
    Ember.run.throttle(this, this.run, this.get('rate_limit'));
    // Return if no items left to process
    if (this.get('queue').length) {
      // Re-poll
      var self = this;
      Ember.run.later(function() {
        self.poll();
      }, this.get('rate_limit'));
    }
  },
  add(origin, destination, departure_date_time, callback, failure) {
    var job = [origin, destination, departure_date_time, callback, failure];
    this.get('queue').push(job);
    this.poll();
  },
  empty() {
    this.get('queue').setObjects([]);
  },
  // Get Valhalla Route
  getRoute(origin_coords, destination_coords, departure_date_time) {
    var api_key = this.get('api_key');
    var url = this.get('url');
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
        type: 1,
        value: departure_date_time.toISOString().slice(0,16)
      }
    };
    return Ember.$.getJSON(url, {
      json: JSON.stringify(params),
      api_key: api_key
    });
  }
});
