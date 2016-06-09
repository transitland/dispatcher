import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(PaginatedSortableRoute, {
  queryParams: {
    applied: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.query("changeset", params);
  }
});
