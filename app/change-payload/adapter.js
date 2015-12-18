import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({
  buildURL: function(type, id, snapshot) {
    return this.urlPrefix() + '/changesets/' + snapshot.record.get('changeset.id') + '/change_payloads/' + id;
  }
});
