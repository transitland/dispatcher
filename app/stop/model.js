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
	geometry_reversegeo: DS.attr(),
  geometry_centroid: DS.attr(),
	tags: DS.attr(),
	issues: DS.hasMany('issue'),
  timezone: DS.attr('string'),
  coordinates: Ember.computed('geometry', 'geometry_reversegeo', function () {
    let c = this.get('geometry');
    if (c.type == 'Point') {
      // return geometry
    } else {
      // return geometry_reversegeo, or if's not set, the geometry_centroid
      c = this.get('geometry_reversegeo') || this.get('geometry_centroid');
    }
    return c.coordinates.slice().reverse();
  }),
  setCoordinates: function(value) {
    // If geometry is a Point, update geometry. Otherwise, update geometry_reversegeo.
    // This will set geometry_reversegeo if it's not initially set for a Polygon.
    let g = {type: 'Point', coordinates: value.map(function(c) { return parseFloat(c.toFixed(5)); } ) };
    let c = this.get('geometry');
    if (c.type == 'Point') {
      console.log('setCoordinates geometry');
      this.set('geometry', g);
    } else {
      console.log('setCoordinates geometry_reversegeo');
      this.set('geometry_reversegeo', g);
    }
  },
  entityType: function() {
    return 'stop';
  },
  toChange: function() {
    return {
      onestopId: this.id,
      name: this.get('name'),
      timezone: this.get('timezone'),
      geometry: this.get('geometry'),
      geometry_reversegeo: this.get('geometry_reversegeo')
    };
  }
});
