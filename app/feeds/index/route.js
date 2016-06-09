import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(PaginatedSortableRoute, {
  queryParams: {
    active_feed_version_update: {
      refreshModel: true
    },
    active_feed_version_expired: {
      refreshModel: true
    },
    active_feed_version_valid: {
      refreshModel: true
    },
    active_feed_version_import_level: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.query('feed', params);
  }
});
