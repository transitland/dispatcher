import Ember from 'ember';
import DS from 'ember-data';
import EntityWithActivityModel from 'dispatcher/entity-with-activity/model';

export default EntityWithActivityModel.extend({
	created_or_updated_in_changeset: DS.belongsTo('changeset', { async: true }),
	identifiers: DS.attr(),
  trips: DS.attr(),
  stop_distances: DS.attr(),
  stop_pattern: DS.attr(),
  color: DS.attr('string'),
  route_onestop_id: DS.attr('string'),
	onestop_id: Ember.computed.alias('id'),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date'),
	geometry: DS.attr(),
	tags: DS.attr(),

	coordinates: Ember.computed(function(){
		return this.get('geometry').coordinates.map(function(coord){
			return coord.slice().reverse();
		});
	}),
	setCoordinates: function(coords) {
		this.set('geometry', {type: 'LineString', coordinates: coords});
	},
	entityType: function() {
    return 'routeStopPattern';
  },
  toChange: function() {
    return {
      onestopId: this.get('onestop_id'),
			routeOnestopId: this.get('route_onestop_id'),
      stopPattern: this.get('stop_pattern'),
      geometry: {
        type: "Point",
        coordinates: this.get('geometry').coordinates
      }
    };
  }
});
