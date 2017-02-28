import ApplicationSerializer from '../application/serializer';

export default ApplicationSerializer.extend({
  primaryKey: 'sha1',
  attrs: {
    issues: {
      embedded: 'always'
    }
  }
});
