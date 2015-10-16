import Ember from 'ember';
import DS from 'ember-data';

var Feed = DS.Model.extend({
	feed_versions: DS.hasMany('feed-version', { async: true }),
	onestop_id: Ember.computed.alias('id'),
	url: DS.attr('string'),
	feed_format: DS.attr('string'),
	license_name: DS.attr('string'),
	license_url: DS.attr('string'),
	license_use_without_attribution: DS.attr('string'),
	license_create_derived_product: DS.attr('string'),
	license_redistribute: DS.attr('string'),
	last_sha1: DS.attr('string'),
	last_fetched_at: DS.attr('string'),
	last_imported_at: DS.attr('string'),
	feed_imports_count: DS.attr('number'),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date'),
  enqueue: function(import_level) {
    var adapter = this.get('store').adapterFor('feed');
    var url = adapter.urlPrefix() + '/webhooks/feed_eater';
    adapter.ajax(url, 'post', {
      data: {
        feed_onestop_ids: [this.get('onestop_id')],
        import_level: import_level
      }
    });
  }
});

export default Feed;
