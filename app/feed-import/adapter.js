import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({
  buildURL: function(type, id, record) {
    return this.urlPrefix() + '/feeds/' + record.get('feed.id') + '/feed_imports/' + id;
  }
});
