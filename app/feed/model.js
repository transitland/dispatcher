import Ember from 'ember';
import DS from 'ember-data';
import EntityWithActivityModel from 'dispatcher/entity-with-activity/model';

export default EntityWithActivityModel.extend({
  feed_versions: DS.hasMany('feed-version', { async: true }),
  active_feed_version: DS.belongsTo('feed-version', { async: true, inverse: 'active_for_feed' }),
  created_or_updated_in_changeset: DS.belongsTo('changeset', { async: true }),
  changesets_imported_from_this_feed: DS.hasMany('changeset', { async: true, inverse: 'imported_from_feed' }),
  issues: DS.hasMany('issue'),

  operators: DS.hasMany('operator', {
    async: true
  }),
  operators_in_feed: DS.attr(),
  import_level_of_active_feed_version: DS.attr('number'),
  import_status: DS.attr('string'),
  urls: DS.attr(),
  type: DS.attr('string'),
  authorization: DS.attr(),
  tags: DS.attr(),
  feed_format: DS.attr('string'),
  name: DS.attr('string'),
  license_name: DS.attr('string'),
  license_url: DS.attr('string'),
  license_use_without_attribution: DS.attr('string'),
  license_attribution_text: DS.attr('string'),
  license_create_derived_product: DS.attr('string'),
  license_redistribute: DS.attr('string'),
  last_sha1: DS.attr('string'),
  last_fetched_at: DS.attr('date'),
  last_imported_at: DS.attr('date'),
  feed_versions_count: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  feedFormatIsGtfsStatic: Ember.computed.equal('type', null),
  onestop_id: Ember.computed.alias('id'),
  hasIssues: Ember.computed('issues', function() {
    return this.get('issues').get('length') > 0;
  }),
  fetchStatusCssClass: Ember.computed('import_status', function() {
    if (this.get('issues').get('firstObject')) {
      return 'danger';
    }
    else if (this.get('last_fetched_at')) {
      return 'success';
    }
    else {
      return '';
    }
  }),
  entityType: function() {
    return 'feed';
  },
  // TODO: move toChange to a mixin
  toChange: function() {
    let change = {
      onestopId: this.id
    };
    // TODO: move list of attributes
    ['urls', 'tags', 'name', 'license_name', 'license_url', 'license_use_without_attribution', 'license_attribution_text', 'license_create_derived_product', 'license_redistribute', 'operators_in_feed'].map((attribute) => {
      if (Object.keys(this.changedAttributes()).includes(attribute)) {
        change[attribute] = this.get(attribute);
      }
    });
    return change;
  },
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
