import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Component.extend({
  // Proxy values
  tag_key_input: null,
  tag_value_input: null,
  // Convert ISO dates to JS Dates
  active_feed_version_valid_jsdate: computed('active_feed_version_valid', function() {
    var value = this.get('active_feed_version_valid');
    return value ? new Date(value) : null;
  }),
  active_feed_version_expired_jsdate: computed('active_feed_version_expired', function() {
    var value = this.get('active_feed_version_expired');
    return value ? new Date(value) : null;
  }),
  actions: {
    // Update tags or dates
    setTagKeyValue() {
      this.set('tag_key', this.get('tag_key_input'));
      this.set('tag_value', this.get('tag_value_input'));
    },
    // Update dates; Note: Computed 'set' didnt work well.
    setActiveFeedVersionExpired(date) {
      date = date ? date.toISOString().slice(0,10) : "";
      this.set('active_feed_version_expired', date);
    },
    setActiveFeedVersionValid(date) {
      date = date ? date.toISOString().slice(0,10) : "";
      this.set('active_feed_version_valid', date);
    }
  }
});
