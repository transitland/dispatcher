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
    this.route('route-geometry', function() {
      this.route('show', { path: '/:issue_id' });
    });
    this.route('new', { path: 'new/:feed_id' });
    this.route('show', { path: '/:issue_id' });
    this.route('feed-fetch', function() {
      this.route('show', { path: '/:issue_id'});
    });
  });
  this.route('stations');
  this.route('routingcheck');

  this.route('error', { path: "*path" });
});

export default Router;
