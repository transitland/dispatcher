import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	onestop_id: Ember.computed.alias('id'),
  name: DS.attr('string'),
  vehicle_type: DS.attr('string'),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date'),
  stops_served_by_route: DS.attr()
});
