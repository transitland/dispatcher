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
  }),
  newPlatform: function() {
    var platform_fragment_ids = this.get('stop_platforms').map(function(i){return i.id.split("<")[1]});
    console.log("platform_fragment_ids:", platform_fragment_ids);
    var platform_fragment = null;
    for (var i=0; i < 1000; i++) {
      platform_fragment = String(i);
      if (platform_fragment_ids.indexOf(platform_fragment) == -1) {
        break
      }
    }
    var platform = this.get('stop_platforms').createRecord(
      {
        id: this.id + '<' + platform_fragment,
        timezone: this.get('timezone'),
        geometry: this.get('geometry'),
        name: 'New Platform'
      }
    );
    return platform;
  }
});
