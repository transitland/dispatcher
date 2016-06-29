import Ember from 'ember';

export default Ember.Controller.extend({
  departure_date_times: [0,7].map(function(offset) {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+offset);
    return tomorrow;
  }),
  sample_routes: 2
});
