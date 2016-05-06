import Ember from 'ember';
import PaginatedController from 'dispatcher/mixins/paginated-controller';

export default Ember.Controller.extend(PaginatedController, {
  active_feed_version_update: false
});
