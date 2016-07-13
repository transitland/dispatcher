import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  scrollToTop: function() {
    window.scrollTo(0, 0);
  }.on('didTransition')
});

Router.map(function() {
  this.route('changesets', function() {
    this.route('show', { path: '/:changeset_id' });
    this.route('edit', { path: '/:changeset_id/edit' });
    this.route('new');
    this.route('change-payloads', { path: '/:changeset_id/change-payloads' }, function() {
      this.route('edit', { path: '/:change_payload_id/edit' });
    });
  });
  this.route('feeds', function() {
    this.route('show', { path: '/:feed_id' });
  });
  this.route('users', function() {
    this.route('show', { path: '/:user_id' });
    this.route('edit', { path: '/:user_id/edit' });
    this.route('new');
  });
  this.route('issues', function() {
    this.route('route-geometry');
  });
});

export default Router;
