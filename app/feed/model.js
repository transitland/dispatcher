import Ember from 'ember';
import DS from 'ember-data';

var Feed = DS.Model.extend({
	feed_versions: DS.hasMany('feed-version', { async: true }),
	onestop_id: Ember.computed.alias('id'),
	import_status: DS.attr('string'),
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
	latest_fetch_exception_log: DS.attr('string'),
	feed_versions_count: DS.attr('number'),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date'),
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
	})
});

export default Feed;
