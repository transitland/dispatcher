import Ember from 'ember';
import PaginatedRoute from 'dispatcher/mixins/paginated-route';

export default Ember.Route.extend(PaginatedRoute, {
  queryParams: {
    activeFeedVersionUpdate: {
      refreshModel: true
    },
    activeFeedVersionExpired: {
      refreshModel: true
    },
    activeFeedVersionValid: {
      refreshModel: true
    }
  },
  model: function(params) {
    // Convert case
    var p = {};
    p['active_feed_version_update'] = params['activeFeedVersionUpdate'];
    p['active_feed_version_expired'] = params['activeFeedVersionExpired'];
    p['active_feed_version_valid'] = params['activeFeedVersionValid'];
    return this.store.query('feed', p);
  }
});
