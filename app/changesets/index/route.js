import Ember from 'ember';
import PaginatedRoute from 'dispatcher/mixins/paginated-route';

export default Ember.Route.extend(PaginatedRoute, {
  queryParams: {
    applied: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.query("changeset", params);
  }
});
