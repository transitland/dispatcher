import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    active_feed_version_update: {
      refreshModel: true
    },
    active_feed_version_expired: {
      refreshModel: true
    },
    active_feed_version_valid: {
      refreshModel: true
    },
    active_feed_version_import_level: {
      refreshModel: true
    },
    latest_fetch_exception: {
      refreshModel: true
    },
    tag_key: {
      refreshModel: true
    },
    tag_value: {
      refreshModel: true
    }
  },
});
