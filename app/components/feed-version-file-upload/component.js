import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import config from '../../config/environment';

export default EmberUploader.FileField.extend({
  session: Ember.inject.service(),
  filesDidChange: function(files) {
    let uploader;
    this.get('session').authorize('authorizer:token', (headerName, headerValue) => {
      uploader = EmberUploader.Uploader.create({
        url: config.datastoreHost + '/api/v1/feed_versions',
        paramNamespace: 'feed_version',
        ajaxSettings: {
          headers: {
            'Authorization': headerValue
          }
        }
      });
    });

    if (!Ember.isEmpty(files)) {
      const flashMessages = Ember.get(this, 'flashMessages');
      const feed_onestop_id = this.get('feed_onestop_id');
      uploader.upload(files[0], {
        feed_onestop_id: feed_onestop_id
      }).then(data => {
        flashMessages.add({
          message: 'Feed version successfully uploaded!',
          type: 'success',
          sticky: true
        });
        // TODO: transition to the feed version page
      }, error => {
        flashMessages.add({
          message: 'Error uploading feed version: ' + JSON.stringify(error),
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
