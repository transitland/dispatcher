import Ember from 'ember';
import PaginatedRoute from 'dispatcher/mixins/paginated-route';

export default Ember.Route.extend(PaginatedRoute, {
  model: function() {
    return this.store.findAll('feed');
  }
});
