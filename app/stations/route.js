import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    zoom: {
      replace: true
    },
    lat: {
      replace: true,
    },
    lng: {
      replace: true,
    },
    bbox: {
      replace: true,
      refreshModel: true
    }
  },
  model: function(params) {
    var bbox = params.bbox;
    // Changeset
    let changeset = this.store.createRecord('changeset', {
      notes: ''
    });
    changeset.get('change_payloads').createRecord();
    // Users
    let users = []; // this.store.findAll('user');
    // Stops
    let stops = this.store.query('stop-station', {bbox: bbox, per_page: 100, total: false});
    return Ember.RSVP.hash({
      changeset: changeset,
      users: users,
      stops: stops
    });
  }
});
