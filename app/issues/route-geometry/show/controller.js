import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';
import IssuesResolvingChangesetController from 'dispatcher/mixins/issues-resolving-changeset-controller';
import IssuesCloseController from 'dispatcher/mixins/issues-close-controller';

export default Ember.Controller.extend(IssuesController,
                                       IssuesResolvingChangesetController,
                                       IssuesCloseController, {

  leafletObjects: {

  },

  rootRoute: 'issues.route-geometry',

  postSuccessTransition: function() {
    let queryParamsObject = this.queryParamsObject();
    this.transitionToRoute('issues.route-geometry.index', { queryParams: queryParamsObject });
  },

  postCloseTransition: function() {
    let queryParamsObject = this.queryParamsObject();
    this.transitionToRoute('issues.route-geometry.index', { queryParams: queryParamsObject });
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

  actions: {
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
    stopAdded: function(leafletId, onestop_id) {
      this.get('leafletObjects')[leafletId] = onestop_id;
    },
    rspAdded: function(leafletId, onestop_id) {
      this.get('leafletObjects')[leafletId] = onestop_id;
    }
  }
});
