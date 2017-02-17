import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(PaginatedSortableRoute, {
  queryParams: {
    tag_key: {
      refreshModel: true
    },
    tag_value: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.query('operator', params);
  }
});
