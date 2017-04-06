import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(PaginatedSortableRoute, AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.query("user", params);
  }
});
