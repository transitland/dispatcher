import Ember from 'ember';
import DS from 'ember-data';
import Stop from 'dispatcher/stop/model';

export default Stop.extend({
  stop_platforms: DS.hasMany('stop-platform', { modelFor: 'stop-platform', inverse: 'parent_stop'}),
  stationLines: Ember.computed('geometry', 'stop_platforms.@each.geometry', function() {
    var origin = this.get('coordinates');
    return this.get('stop_platforms').map(function(stop_platform) {
      return [origin, stop_platform.get('coordinates')];
    });
  })
});
