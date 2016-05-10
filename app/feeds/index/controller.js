import Ember from 'ember';
import PaginatedController from 'dispatcher/mixins/paginated-controller';

export default Ember.Controller.extend(PaginatedController, {
  activeFeedVersionUpdate: false
});
