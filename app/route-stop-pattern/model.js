import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
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
	tags: DS.attr()

	coordinates: Ember.computed(function(){
		var coords = this.get('geometry').coordinates.map(function(coord){
			coord.reverse();
			return coord;
		});
		return coords;
	})
});
