import Route from '@ember/routing/route';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Route.extend(PaginatedSortableRoute, {
  queryParams: {
    applied: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.query("changeset", params);
  }
});
