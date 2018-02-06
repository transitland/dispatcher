import Ember from 'ember';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import Controller from '@ember/controller';
import IssuesController from 'dispatcher/mixins/issues-controller';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Controller.extend(IssuesController, PaginatedSortableController, {
  rootRoute: 'issues.route-geometry',
  hasNextPage: computed("model.issues.meta.next", function() {
    if (isPresent(this.get('model.issues.meta.next'))) {
      return true;
    } else {
      return false;
    }
  })
});
