import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({
  buildURL: function(type, id, snapshot) {
    return this.urlPrefix() + '/feeds/' + snapshot.record.get('feed_version.feed.id') + '/feed_versions/' + snapshot.record.get('feed_version.id') + '/feed_version_imports/' + id;
  }
});
