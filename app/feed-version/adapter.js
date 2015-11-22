import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({
  buildURL: function(type, id, snapshot) {
    return this.urlPrefix() + '/feeds/' + snapshot.record.get('feed.id') + '/feed_versions/' + id;
  }
});
