import Controller from '@ember/controller';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Controller.extend(PaginatedSortableController, {
  tag_key: null,
  tag_value: null,
  country: null,
  state: null,
  metro: null
});
