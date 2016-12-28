import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Ember.Controller.extend(IssuesController, PaginatedSortableController, {
  rootRoute: 'issues.feed-fetch',
  hasNextPage: Ember.computed("model.issues.meta.next", function() {
    if (Ember.isPresent(this.get('model.issues.meta.next'))) {
      return true;
    } else {
      return false;
    }
  })
});
