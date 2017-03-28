import DS from 'ember-data';
import ApplicationSerializer from '../application/serializer';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'id',

  attrs: {
    entities_with_issues: { embedded: 'always' }
  }
});
