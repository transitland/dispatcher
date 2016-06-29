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
  parent_stop_onestop_id: Ember.computed('parent_stop', {
    get(key) {
      return this.get('parent_stop').get('id');
    },
    set(key, value) {
      this.set('parent_stop', value);
    }
  }),
  coordinates: Ember.computed('geometry', {
    get(key) {
      return this.get('geometry').coordinates.reverse();
    },
    set(key, value) {
      return this.setCoordinates(value);
    }
  }),
  setCoordinates: function(value) {
    var geometry = this.get('geometry');
    console.log('before', geometry.coordinates);
    geometry.coordinates = value.reverse();
    this.set('geometry', geometry);
    console.log('after', geometry.coordinates);
  },
  stationLines: Ember.computed('stop_platforms.@each.geometry', function() {
    var origin = this.get('coordinates');
    var lines = this.get('stop_platforms').map(function(stop_platform) {
      return [origin, stop_platform.get('coordinates')];
    });
    console.log(JSON.stringify(lines));
    return lines
  }),
  toChange: function() {
    return {
      onestopId: this.id,
      parent_stop_onestop_id: this.get('parent_stop_onestop_id'),
      geometry: this.get('geometry')
    }
  }
});