import ApplicationSerializer from '../application/serializer';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'sha1',
  attrs: {
    issues: {
      embedded: 'always'
    }
  }
});
