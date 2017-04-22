import ApplicationSerializer from '../application/serializer';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'onestop_id',
	attrs: {
		feeds: {
			key: 'represented_in_feed_onestop_ids',
      deserialize: 'ids'
		}
	}
});
