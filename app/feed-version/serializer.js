import ApplicationSerializer from '../application/serializer';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'sha1',
  attrs: {
    issues: {
      embedded: 'always'
    }
  }
});
