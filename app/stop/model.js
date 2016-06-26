import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	identifiers: DS.attr(),
  name: DS.attr('string'),
	onestop_id: Ember.computed.alias('id'),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date'),
	geometry: DS.attr(),
	tags: DS.attr(),

	coordinates: Ember.computed(function(){
		return this.get('geometry').coordinates.reverse();
	})
});
