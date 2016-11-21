import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';

export default Ember.Controller.extend(IssuesController, {

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

  pollChangesetApply: function(url, applicationAdapter) {
    var self = this;
    applicationAdapter.ajax(url, 'post').then(function(response){
      if (response.status === 'complete') {
        self.set('applyMessage', {show: true, status: response.status, newIssues: [], message: 'Successfully resolved issue ' + self.get('model.selectedIssue.id') });
      }
      else if (response.status === 'error') {
        self.set('applyMessage', {show: true, status: response.status, message: 'Error resolving issue ' + self.get('model.selectedIssue.id') + '. ' + response.errors});
      }
      else {
        Ember.run.later(self.pollChangesetApply.bind(self, url, applicationAdapter), 5000);
      }
    }).catch(function(error){
      self.set('applyMessage', {show: true, status: 'error', message: 'Error resolving issue ' + self.get('model.selectedIssue.id') + '. ' + error.errors.map(function(e){ return e.message}).join('. ')});
    });
  },

  actions: {
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
          return changeset.apply_async();
        }).then(function(response) {
          self.set('applyingSpinner', false);
          self.set('showChangeset', false);
          self.set('applyMessage', {show: true, status: response.status, newIssues: [], message: 'Applying changeset to resolve issue ' + self.get('model.selectedIssue.id') });
        }).catch(function(error) {

        });
    },
    toggleApplyMessage: function() {
      this.set('applyMessage.show', false);
      if (this.get('applyMessage').status === 'complete') {
        let queryParamsObject = this.queryParamsObject();
        this.transitionToRoute('issues.route-geometry.index', { queryParams: queryParamsObject });
      }
      if (this.get('applyMessage').status === 'queued') {
        var applicationAdapter = this.store.adapterFor('changeset');
        var modelUrl = applicationAdapter.buildURL('changeset', this.get('model.changeset.id'));
        var applyUrl = modelUrl + '/apply_async';
        this.pollChangesetApply(applyUrl, applicationAdapter);
      }
      if (this.get('applyMessage').status === 'error') {
        // clean the changeset, but leave edits.
        let changeset = this.store.createRecord('changeset', {
          notes: 'Issue resolution:'
        });
        changeset.get('change_payloads').createRecord();
        this.set('model.changeset', changeset);
      }
    },
    closeDialog: function() {
      this.set('closeMessage', {show: true, message: 'Close issue ' + this.get('model.selectedIssue.id')});
    },
    closeIssue: function() {
      this.model.selectedIssue.set('open', false);
      var self = this;
      modelIssue.save().then(function(){
        self.set('closeMessage.show', false);
        let queryParamsObject = self.queryParamsObject();
        self.transitionToRoute('issues.route-geometry.index', { queryParams: queryParamsObject });
      }).catch(function(error){
        self.set('closeMessage', {show: true, error: true, message: 'Error closing issue ' + self.get('model.selectedIssue.id') + '. ' + error.message});
      });
    },
    toggleCloseMessage: function() {
      this.set('closeMessage.show', false);
    },
    issueClicked: function(issue) {
      if (this.get('model.selectedIssue')) {
        if (issue.get('id') === this.get('model.selectedIssue').get('id')) {
          return;
        }
      }
      let queryParamsObject = this.queryParamsObject();
      this.transitionToRoute('issues.route-geometry.show', issue.id, { queryParams: queryParamsObject });
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
    stopAdded: function(leafletId, onestop_id) {
      this.get('leafletObjects')[leafletId] = onestop_id;
    },
    rspAdded: function(leafletId, onestop_id) {
      this.get('leafletObjects')[leafletId] = onestop_id;
    }
  }
});
