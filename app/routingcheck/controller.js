import Controller from '@ember/controller';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Controller.extend(PaginatedSortableController, {
  per_page: 10,
  departure_date_times: [0,7,14].map(function(offset) {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+offset);
    return tomorrow;
  })
});
