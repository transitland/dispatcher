import Ember from 'ember';
import PaginatedController from 'dispatcher/mixins/paginated-controller';

export default Ember.Controller.extend(PaginatedController, {
  activeFeedVersionUpdate: false,
  activeFeedVersionExpired: null,
  activeFeedVersionValid: null,
  actions: {
    setActiveFeedVersionExpired(date) {
      // Convert to YYYY-MM-DD
      date = date ? date.toISOString().slice(0,10) : "";
      this.set('activeFeedVersionExpired', date);
    },
    setActiveFeedVersionValid(date) {
      // Convert to YYYY-MM-DD
      date = date ? date.toISOString().slice(0,10) : "";
      this.set('activeFeedVersionValid', date);
    }
  }
});
