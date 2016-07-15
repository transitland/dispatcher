import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	onestop_id: Ember.computed.alias('id'),
  name: DS.attr('string'),
  timezone: DS.attr('string'),
  geometry: DS.attr(),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date')
});
