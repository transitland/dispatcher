import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  currentUser: inject.service(),
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
    },
    min_egresses: {
      replace: true,
      refreshModel: true
    },
    exclude: {
      replace: true,
      refreshModel: true
    }
  },
  model: function(params) {
    var bbox = params.bbox;
    let min_platforms = parseInt(params.min_platforms);
    let min_egresses = parseInt(params.min_egresses);
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
      total: false,
      exclude: params.exclude
    }
    if (min_platforms > 0) {
      q.min_platforms = min_platforms
    }
    if (min_egresses > 0) {
      q.min_egresses = min_egresses
    }
    return Ember.RSVP.hash({
      changeset: changeset,
      stops: this.store.query('stop-station', q)
    });
  }
});
