import Ember from 'ember';
import PaginatedRoute from 'dispatcher/mixins/paginated-route';

export default Ember.Route.extend(PaginatedRoute, {
  queryParams: {
    activeFeedVersionUpdate: {
      refreshModel: true
    }
  },
  model: function(params) {
    var p = {};
    p['active_feed_version_update'] = params['activeFeedVersionUpdate'];
    return this.store.query('feed', p);
  }
});
