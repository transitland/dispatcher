import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';
import IssuesResolvingChangesetController from 'dispatcher/mixins/issues-resolving-changeset-controller';
import IssuesCloseController from 'dispatcher/mixins/issues-close-controller';

export default Ember.Controller.extend(IssuesController,
                                       IssuesResolvingChangesetController,
                                       IssuesCloseController, {
  editableLeafletObjects: {
    // Some layers should not be editable, so this keeps track of those that are.
    // leaflet layer id -> onestop_id
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
    entities = entities.concat(this.store.peekAll('route-stop-pattern').filter(function(e) {
        return e.get('hasDirtyAttributes') && typeof e.changedAttributes().geometry !== "undefined";
    }));
    entities = entities.concat(this.store.peekAll('stop').filter(function(e) {
        return e.get('hasDirtyAttributes') && typeof e.changedAttributes().geometry !== "undefined"; 
    }));
    return entities.map(function(e) {
      var ret = {};
      ret['action'] = 'createUpdate';
      ret['issuesResolved'] = [parseInt(this.model.selectedIssue.id)];
      ret[e.entityType()] = e.toChange();
      return ret;
    }, this);
  },
  actions: {
    actionDrawEdited: function(EditedEvent) {
      // applying changes
      let layers = EditedEvent.layers._layers;
      Object.keys(layers).forEach(function(id) {
        var editedLayer = layers[id];
        var onestop_id = this.get('editableLeafletObjects')[id];
        if (onestop_id.match(/^s\-/)){
          if (this.get('model.issueStops')) {
            this.get('model.issueStops').forEach(function(stop){
              if (stop.get('onestop_id') === onestop_id) {
                let latlng = editedLayer.getLatLng();
                stop.setCoordinates([latlng.lng, latlng.lat]);
              }
            });
          }
        }
        else if (onestop_id.match(/^r\-/)) {
          this.get('model.issueRouteStopPatterns').forEach(function(rsp){
            if (rsp.get('onestop_id') === onestop_id) {
              let latlngs = editedLayer.getLatLngs();
              rsp.setCoordinates(latlngs.map(function(latlng){ return [latlng.lng, latlng.lat]; }));
            }
          });
        }
      }, this);
    },
    editEntityAdded: function(leafletId, onestop_id) {
      this.get('editableLeafletObjects')[leafletId] = onestop_id;
    }
  }
});
