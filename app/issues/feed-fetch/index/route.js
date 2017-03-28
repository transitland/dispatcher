import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(IssuesRoute, PaginatedSortableRoute, {
  category: 'feed_fetch'
});
