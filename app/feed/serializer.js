import ApplicationSerializer from '../application/serializer';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'onestop_id',
  attrs: {
    changesets_imported_from_this_feed: {
      key: 'changesets_imported_from_this_feed',
      deserialize: 'ids'
    },
    issues: {
      embedded: 'always'
    }
  },
  normalize(modelClass, resourceHash) {
    resourceHash.operators = resourceHash.operators_in_feed.map((oif) => {
      return oif.operator_onestop_id;
    });
    return this._super(...arguments);
  }
});
