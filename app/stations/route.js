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
    if (bbox) {
      return this.store.query('stop-station', {
        bbox: bbox
      });
    }
  }
});
