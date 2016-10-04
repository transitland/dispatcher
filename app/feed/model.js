import Ember from 'ember';
import DS from 'ember-data';
import EntityWithActivityModel from 'dispatcher/entity-with-activity/model';

export default EntityWithActivityModel.extend({
  feed_versions: DS.hasMany('feed-version', { async: true }),
  active_feed_version: DS.belongsTo('feed-version', { async: true, inverse: 'active_for_feed' }),
  created_or_updated_in_changeset: DS.belongsTo('changeset', { async: true }),
  changesets_imported_from_this_feed: DS.hasMany('changeset', { async: true, inverse: 'imported_from_feed' }),

  import_level_of_active_feed_version: DS.attr('number'),
  import_status: DS.attr('string'),
  url: DS.attr('string'),
  tags: DS.attr(),
  feed_format: DS.attr('string'),
  license_name: DS.attr('string'),
  license_url: DS.attr('string'),
  license_use_without_attribution: DS.attr('string'),
  license_attribution_text: DS.attr('string'),
  license_create_derived_product: DS.attr('string'),
  license_redistribute: DS.attr('string'),
  last_sha1: DS.attr('string'),
  last_fetched_at: DS.attr('date'),
  last_imported_at: DS.attr('date'),
  latest_fetch_exception_log: DS.attr('string'),
  feed_versions_count: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  onestop_id: Ember.computed.alias('id'),
  importStatusCssClass: Ember.computed('import_status', function() {
    switch(this.get('import_status')) {
      case 'most_recent_succeeded':
        return 'success';
      case 'most_recent_failed':
        return 'danger';
      case 'in_progress':
        return 'active';
      case 'never_imported':
        return '';
      case 'unknown':
        return 'warning';
    }
  }),
  enqueue: function(importLevel) {
    var adapter = this.get('store').adapterFor('feed');
    var url = adapter.urlPrefix() + '/webhooks/feed_eater';
    return adapter.ajax(url, 'post', {
      data: {
        feed_onestop_id: this.get('onestop_id'),
        import_level: importLevel
      }
    });
  }
});
