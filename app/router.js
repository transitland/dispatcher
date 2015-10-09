import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('changesets', function() {
    this.route('show', { path: '/:changeset_id' });
    this.route('edit', { path: '/:changeset_id/edit' });
    this.route('new');
  });
});

export default Router;
