import Ember from 'ember';
import PaginatedController from 'dispatcher/mixins/paginated-controller';

export default Ember.Controller.extend(PaginatedController, {
  active_feed_version_update: false,
  active_feed_version_expired: null,
  active_feed_version_valid: null,
  active_feed_version_import_level: null,
  tag_key: null,
  tag_value: null,
  actions: {
    setActiveFeedVersionExpired(date) {
      // Convert to YYYY-MM-DD
      date = date ? date.toISOString().slice(0,10) : "";
      this.set('active_feed_version_expired', date);
    },
    setActiveFeedVersionValid(date) {
      // Convert to YYYY-MM-DD
      date = date ? date.toISOString().slice(0,10) : "";
      this.set('active_feed_version_valid', date);
    }
  }
});
