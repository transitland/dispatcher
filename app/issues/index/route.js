import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(PaginatedSortableRoute, {
  model: function(params) {
    return Ember.RSVP.hash({
      feeds: this.store.query('feed', params)
    });
  }
});
