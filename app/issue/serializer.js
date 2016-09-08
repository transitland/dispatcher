import ApplicationSerializer from '../application/serializer';

export default ApplicationSerializer.extend({
  primaryKey: 'id',

  attrs: {
    entities_with_issues: { embedded: 'always' }
  }
});
