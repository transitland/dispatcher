import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';

export default Ember.Route.extend(IssuesRoute, PaginatedSortableRoute, {
  model: function(params) {
    params['category'] = 'feed_fetch';
    let issues = this.store.query('issue', params, { reload: true });
    return Ember.RSVP.hash({
      issues: issues
    });
  }
});
