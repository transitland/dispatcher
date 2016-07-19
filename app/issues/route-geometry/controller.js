import Ember from 'ember';
//import L from 'ember-leafet';

export default Ember.Controller.extend({
  leafletObjects: {

  },

  getChanges: function() {
    var entities = [];
    entities = entities.concat(this.store.peekAll('route-stop-pattern').filter(function(e) { return e.get('hasDirtyAttributes'); }) );
    entities = entities.concat(this.store.peekAll('stop').filter(function(e) { return e.get('hasDirtyAttributes'); }));
    var self = this;
    return entities.map(function(e) {
      var ret = {};
      ret['action'] = 'createUpdate';
      ret['issuesResolved'] = [parseInt(self.model.selectedIssue.id)];
      ret[e.entityType()] = e.toChange();
      return ret;
    });
  },

  currentClicked: null,

  actions: {
    issueClicked: function(issue) {

      if (this.get('model.selectedIssue')) {
        if (issue.get('id') === this.get('model.selectedIssue').get('id')) {
          return;
        }
      }

      this.store.unloadAll('route-stop-pattern');
      this.store.unloadAll('stop');
      this.set('leafletObjects',{});

      this.set('model.selectedIssue', issue);
      var rsps = [];
      var stops = [];
      issue.get('entities_with_issues').forEach(function(entity){
        if (entity.onestop_id.split('-')[0] === 'r') {
          rsps.push(entity.onestop_id);
        }
        else if (entity.onestop_id.split('-')[0] === 's') {
          stops.push(entity.onestop_id);
        }
      });
      rsps = this.store.query('route-stop-pattern', {onestop_id: rsps.join(',')});
      stops = this.store.query('stop', {onestop_id: stops.join(',')});
      this.set('model.issueRouteStopPatterns', rsps);
      this.set('model.issueStops', stops);

      var bounds;

      var self = this;
      stops.then(function(){
        bounds = new L.latLngBounds(stops.map(function(stop) {
          return new L.latLng(stop.get('coordinates'));
        }));

        rsps.then(function(){
          rsps.forEach(function(rsp){
            rsp.get('coordinates').forEach(function(coord){
              bounds.extend(new L.latLng(coord));
            });
          });
          self.set('model.bounds', bounds);
        });
      });
    },
    actionDrawEdited: function(EditedEvent) {
      var self = this;

      // TODO: duplication refactor

      this.get('model.issueStops').forEach(function(stop){
        for (var layer in EditedEvent.layers._layers) {
          if (stop.get('onestop_id') === self.get('leafletObjects')[layer]) {
            var latlng = EditedEvent.layers._layers[layer]._latlng;
            stop.setCoordinates([latlng.lng, latlng.lat]);
          }
        }
      });

      this.get('model.issueRouteStopPatterns').forEach(function(rsp){
        for (var layer in EditedEvent.layers._layers) {
          if (rsp.get('onestop_id') === self.get('leafletObjects')[layer]) {
            var latlngs = EditedEvent.layers._layers[layer]._latlngs;
            rsp.setCoordinates(latlngs.map(function(latlng){ return [latlng.lng, latlng.lat]; }));
          }
        }
      });
    },
    showChangeset: function() {
      var payload = {changes: this.getChanges()};
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    },
    saveChangeset: function(apply) {
      const flashMessages = Ember.get(this, 'flashMessages');
      var self = this;
      return this.model.changeset.save()
        .then(function(changeset) {
          return changeset.apply()
        }).then(function(changeset) {
          flashMessages.success('Changeset created & applied. Issue resolved.');
          self.set('showChangeset', false);
          window.location.reload(true);
        }).catch(function(error) {
          flashMessages.danger('Error(s) updating change payload: ${error.message}');
        });
    },
    stopAdded: function(leafletId, onestop_id) {
      this.get('leafletObjects')[leafletId] = onestop_id;
    },
    rspAdded: function(leafletId, onestop_id) {
      this.get('leafletObjects')[leafletId] = onestop_id;
    }
  }
});
