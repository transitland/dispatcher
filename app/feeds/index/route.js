import Ember from 'ember';
import PaginatedRoute from 'dispatcher/mixins/paginated-route';

export default Ember.Route.extend(PaginatedRoute, {
  queryParams: {
    active_feed_version_update: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.query('feed', params);
  }
});
