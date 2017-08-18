import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';
import config from '../../config/environment';

export default Ember.Route.extend(PaginatedSortableRoute, {
  queryParams: {
    tag_key: {
      refreshModel: true
    },
    tag_value: {
      refreshModel: true
    },
    country: {
      refreshModel: true
    },
    state: {
      refreshModel: true
    },
    metro: {
      refreshModel: true
    },
    without_feed: {
      refreshModel: true
    }
  },
  model: function(params) {
    let geographies = Ember.$.get(config.datastoreHost + '/api/v1/operators/aggregate').then(function(response) {
        return {
          countries: Object.keys(response.country),
          states: Object.keys(response.state),
          metros: Object.keys(response.metro),
        }
      });
    let operators = this.store.query('operator', params);
    return Ember.RSVP.hash({
      geographies: geographies,
      operators: operators
    });
  }
});
