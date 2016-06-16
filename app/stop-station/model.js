import Ember from 'ember';
import DS from 'ember-data';
import EntityWithActivityModel from 'dispatcher/entity-with-activity/model';

export default EntityWithActivityModel.extend({
	created_or_updated_in_changeset: DS.belongsTo('changeset', { async: true }),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date'),
	onestop_id: Ember.computed.alias('id')
});
