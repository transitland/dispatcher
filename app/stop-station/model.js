import Ember from 'ember';
import DS from 'ember-data';
import EntityWithActivityModel from 'dispatcher/entity-with-activity/model';

export default EntityWithActivityModel.extend({
	created_or_updated_in_changeset: DS.belongsTo('changeset', { async: true }),
	onestop_id: Ember.computed.alias('id'),
	name: DS.attr('string'),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date'),
	geometry: DS.attr(),
	tags: DS.attr(),
  parent_stop: DS.belongsTo('stop-station', { async: true, modelFor: 'stop-station' }),
  stop_platforms: DS.hasMany('stop-station', { async: true, modelFor: 'stop-station', inverse: 'parent_stop'}),
  // stop_egresses: DS.hasMany('stop-station', { async: true, modelFor: 'stop-station' }),
  lat: Ember.computed('geometry', function() {
    return this.get('geometry').coordinates[1];
  }),
  lng: Ember.computed('geometry', function() {
    return this.get('geometry').coordinates[0];
  }),
  stationArea: Ember.computed('stop_platforms', 'stop_egresses', function() {
    return this.get('stop_platforms').map(function(sp){return sp.get('geometry').coordinates.reverse();});
  }),
});
