import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';
import FeedParamsRoute from 'dispatcher/mixins/feed-params-route';

export default Ember.Route.extend(FeedParamsRoute, PaginatedSortableRoute, {
  model: function(params) {
    return this.store.query('feed', params);
  }
});
