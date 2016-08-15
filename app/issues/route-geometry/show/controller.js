import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['feed_onestop_id', 'open', 'issue_type'],

  issue_type: '',

  feed_onestop_id: '',

  open: true,

  queryParamsObject: function() {
    var queryParams = {};
    var self = this;
    this.get('queryParams').forEach(function(param) { queryParams[param] = self.get(param);  });
    return queryParams;
  },

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

  actions: {
    issueClicked: function(issue) {
      if (this.get('model.selectedIssue')) {
        if (issue.get('id') === this.get('model.selectedIssue').get('id')) {
          return;
        }
      }
      let queryParams = this.queryParamsObject();
      this.transitionToRoute('issues.route-geometry.show', issue.id, { queryParams: queryParams });
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
      var self = this;
      return this.model.changeset.save()
        .then(function(changeset) {
          self.set('applyingSpinner', true);
          return changeset.apply();
        }).then(function(changeset) {
          self.set('applyingSpinner', false);
          self.set('showChangeset', false);
          self.set('applyMessage', {show: true, error: false, message: 'Changeset created and applied. Issue ' + self.get('model.selectedIssue.id') + ' has been successfully resolved.'});
        }).catch(function(error) {
          self.set('applyingSpinner', false);
          self.set('showChangeset', false);
          self.set('applyMessage', {show: true, error: true, message: 'Error resolving issue ' + self.get('model.selectedIssue.id') + '. ' + error.message});
        });
    },
    toggleApplyMessage: function() {
      this.set('applyMessage.show', false);
      if (!this.get('applyMessage').error) {
        let queryParams = this.queryParamsObject();
        this.transitionToRoute('issues.route-geometry.index', { queryParams: queryParams });
      }
    },
    closeDialog: function() {
      this.set('closeMessage', {show: true, message: 'Close issue ' + this.get('model.selectedIssue.id')});
    },
    closeIssue: function() {
      this.model.selectedIssue.set('open', false);
      this.model.selectedIssue.save();
      this.set('closeMessage.show', false);
      let queryParams = this.queryParamsObject();
      this.transitionToRoute('issues.route-geometry.index', { queryParams: queryParams });
    },
    toggleCloseMessage: function() {
      this.set('closeMessage.show', false);
    },
    stopAdded: function(leafletId, onestop_id) {
      this.get('leafletObjects')[leafletId] = onestop_id;
    },
    rspAdded: function(leafletId, onestop_id) {
      this.get('leafletObjects')[leafletId] = onestop_id;
    }
  }
});
