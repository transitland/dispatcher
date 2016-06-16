import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(PaginatedSortableRoute, {
  model: function(params) {
    console.log('stations');
    return this.store.query('stop-station', params);
  }
});
