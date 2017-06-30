import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),
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
    },
    min_platforms: {
      replace: true,
      refreshModel: true
    }
  },
  model: function(params) {
    var bbox = params.bbox;
    let min_platforms = parseInt(params.min_platforms);
    // Changeset
    let changeset = this.store.createRecord('changeset', {
      user: this.get('currentUser.user'),
      notes: 'Station editor:'
    });
    changeset.get('change_payloads').createRecord();
    // Stops
    let q = {
      bbox: bbox,
      per_page: 1000,
      total: false
    }
    if (min_platforms > 0) {
      q.min_platforms = min_platforms
    }
    return Ember.RSVP.hash({
      changeset: changeset,
      stops: this.store.query('stop-station', q)
    });
  }
});
