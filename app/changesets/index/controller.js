import Ember from 'ember';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Ember.Controller.extend(PaginatedSortableController, {
  applied: false,
  sort_key: 'updated_at',
  sort_order: 'desc'
});
