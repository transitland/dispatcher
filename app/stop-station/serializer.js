import ApplicationSerializer from '../application/serializer';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'onestop_id',
  attrs: {
    stop_platforms: {
      deserialize: 'records'
    }
  }
});
