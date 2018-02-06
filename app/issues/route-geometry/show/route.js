import Ember from 'ember';
import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import IssuesRoute from 'dispatcher/mixins/issues-route';

export default Route.extend(IssuesRoute, {
  currentUser: inject.service(),

  model: function(params) {
    // In the future, it would be worthwhile to consider keeping entities
    // and their edits across issues.
    this.store.unloadAll('changeset');
    this.store.unloadAll('change_payload');
    this.store.unloadAll('stop');
    this.store.unloadAll('route-stop-pattern');
    // leave issues, so as to not have to repopulate issues table

    const flashMessages = Ember.get(this, 'flashMessages');
    let self = this;

    let changeset = self.store.createRecord('changeset', {
      user: self.get('currentUser.user'),
      notes: 'Issue resolution:'
    });

    changeset.get('change_payloads').createRecord();

    return Ember.RSVP.hash({
      changeset: changeset
    }).then(function(model){
      return Ember.RSVP.hash({
        changeset: model.changeset,
        users: self.store.query('user', { per_page: false })
      });
    }).then(function(model){
      return Ember.RSVP.hash({
        changeset: model.changeset,
        users: model.users,
        selectedIssue: self.store.findRecord('issue', params['issue_id'], { reload: true })
      });
    }).then(function(model){
      let stopIds = [];
      model.selectedIssue.get('entities_with_issues').forEach(function(entity){
        if (entity.get('onestop_id').split('-')[0] === 's') {
          stopIds.push(entity.get('onestop_id'));
        }
      });

      let getStops = function(stopIds) {
        return new Ember.RSVP.Promise(function(resolve, reject){
          if (stopIds.length > 0) {
            resolve(self.store.query('stop', {onestop_id: stopIds.join(',')}));
          }
          else {
            // sometimes issues don't have stops
            resolve();
          }
        });
      }

      return Ember.RSVP.hash({
        changeset: model.changeset,
        users: model.users,
        selectedIssue: model.selectedIssue,
        issueStops: getStops(stopIds)
      });
    }).then(function(model){
      let rspIds = [];
      model.selectedIssue.get('entities_with_issues').forEach(function(entity){
        if (entity.get('onestop_id').split('-')[0] === 'r') {
          rspIds.push(entity.get('onestop_id'));
        }
      });

      let getRSPs = function(rspIds) {
        return new Ember.RSVP.Promise(function(resolve, reject){
          resolve(self.store.query('route-stop-pattern', {onestop_id: rspIds.join(',')}));
        });
      }

      return Ember.RSVP.hash({
        changeset: model.changeset,
        users: model.users,
        selectedIssue: model.selectedIssue,
        issueStops: model.issueStops,
        issueRouteStopPatterns: getRSPs(rspIds)
      });
    }).then(function(model){
      let bounds = new L.latLngBounds([]);

      if (model.issueStops) {
        model.issueStops.forEach(function(stop){
          bounds.extend(new L.latLng(stop.get('coordinates')));
        });
      }

      if (model.issueRouteStopPatterns) {
        model.issueRouteStopPatterns.forEach(function(rsp){
          // Distance calc issue details come with a full array of stop distances along the RSP
          if (model.selectedIssue.get('issue_type') == 'distance_calculation_inaccurate') {
            let re = 'Distances: \\[.+\\]';
            let match = model.selectedIssue.get('details').match(re);
            if (match) {
              rsp.set('stop_distances', JSON.parse(match[0].replace('Distances: ', '')));
              model.selectedIssue.set('details', model.selectedIssue.get('details').replace(/Distances: \[.+\]/, ''));
            }
          }

          rsp.get('coordinates').forEach(function(coord){
            bounds.extend(new L.latLng(coord));
          });
        });
      }

      return Ember.RSVP.hash({
        changeset: model.changeset,
        users: model.users,
        selectedIssue: model.selectedIssue,
        issueStops: model.issueStops,
        issueRouteStopPatterns: model.issueRouteStopPatterns,
        bounds: bounds
      });
    }).catch((error) => {
      flashMessages.add({
        message: `Error(s): ${error.message}`,
        type: 'danger',
        sticky: true
      });
    });
  }
});
