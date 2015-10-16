import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  feed: DS.belongsTo('feed', { async: true }),
  feed_version_imports: DS.hasMany('feed-version-import', { async: true }),
  sha1: Ember.computed.alias('id'),
  md5: DS.attr('string'),
  file_size: DS.attr('number'),
  earliest_calendar_date: DS.attr('date'),
  latest_calendar_date: DS.attr('date'),
  tags: DS.attr(),
  fetched_at: DS.attr('date'),
  imported_at: DS.attr('date'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
