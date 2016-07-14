import Ember from 'ember';

export default Ember.Controller.extend({
  per_page: 10,
  departure_date_times: [0,7,14].map(function(offset) {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+offset);
    return tomorrow;
  })
});
