import DS from 'ember-data';
import ApplicationSerializer from '../application/serializer';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    // imported_from_feed: {
    //   key: 'imported_from_feed_onestop_id'
    // },
    // imported_from_feed_version: {
    //   key: 'imported_from_feed_version_sha1'
    // },
    change_payloads: {
      serialize: 'records',
      deserialize: 'ids'
    },
    user: {
      serialize: 'records',
      deserialize: 'ids'
    },
    applied: {
      serialize: false
    },
    applied_at: {
      serialize: false
    },
    created_at: {
      serialize: false
    },
    updated_at: {
      serialize: false
    }
  }
});
