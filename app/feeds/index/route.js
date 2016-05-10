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
    var p = {};
    if (params['activeFeedVersionUpdate']) {
      p['active_feed_version_update'] = params['activeFeedVersionUpdate'];
    }
    if (params['activeFeedVersionExpired']) {
      p['active_feed_version_expired'] = params['activeFeedVersionExpired']
    }
    if (params['activeFeedVersionValid']) {
      p['active_feed_version_valid'] = params['activeFeedVersionValid']
    }
    console.log(p);
    return this.store.query('feed', p);
  }
});
