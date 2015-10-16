import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({
  buildURL: function(type, id, record) {
    return this.urlPrefix() + '/feeds/' + record.get('feed_version.feed.id') + '/feed_versions/' + record.get('feed_version.id') + '/feed_version_imports/' + id;
  }
});
