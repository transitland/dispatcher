import Ember from 'ember';
import PaginatedController from 'dispatcher/mixins/paginated-controller';

export default Ember.Controller.extend(PaginatedController, {
  activeFeedVersionUpdate: false,
  activeFeedVersionExpired: '2016-05-10',
  activeFeedVersionValid: '2016-05-10'
});
