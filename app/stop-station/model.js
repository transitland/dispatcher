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
  parent_stop: DS.belongsTo('stop-station', { modelFor: 'stop-station' }),
  stop_platforms: DS.hasMany('stop-station', { modelFor: 'stop-station', inverse: 'parent_stop'}),
  parent_stop_onestop_id: Ember.computed('parent_stop', {
    get(key) {
      return this.get('parent_stop').get('id');
    },
    set(key, value) {
      this.set('parent_stop', value);
    }
  }),
  coordinates: Ember.computed('geometry', function () {
    return this.get('geometry').coordinates.reverse();
  }),
  setCoordinates: function(value) {
    this.set('geometry', {type: 'Point', coordinates: value});
  },
  stationLines: Ember.computed('geometry', 'stop_platforms.@each.geometry', function() {
    var origin = this.get('coordinates');
    return this.get('stop_platforms').map(function(stop_platform) {
      return [origin, stop_platform.get('coordinates')];
    });
  }),
  toChange: function() {
    return {
      onestopId: this.id,
      parentStopOnestopId: this.get('parent_stop_onestop_id'),
      name: this.get('name'),
      geometry: this.get('geometry')
    }
  }
});
