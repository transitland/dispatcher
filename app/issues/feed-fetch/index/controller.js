import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Ember.Controller.extend(IssuesController, PaginatedSortableController, {
  actions: {
    issueClicked: function(issue) {
      console.log(issue);
    }
  }
});
