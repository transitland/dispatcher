import Route from '@ember/routing/route';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Route.extend(PaginatedSortableRoute, {
  model: function(params) {
    return this.store.query("user", params);
  }
});
