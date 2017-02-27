import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';

export default Ember.Route.extend(IssuesRoute, {

  model: function(params) {
    // In the future, it would be worthwhile to consider keeping entities
    // and their edits across issues.
    this.store.unloadAll('changeset');
    this.store.unloadAll('change_payload');
    this.store.unloadAll('stop');
    this.store.unloadAll('route-stop-pattern');
    // leave issues, so as to not have to repopulate issues table

    let self = this;
    return this.store.findRecord('issue', params['issue_id'], { reload: true }).then(function(selectedIssue){

      let changeset = self.store.createRecord('changeset', {
        notes: 'Issue resolution:'
      });
      changeset.get('change_payloads').createRecord();
      let users = self.store.query('user', { per_page: false });
      let rspIds = [];
      let stopIds = [];
      // TODO use polymorphic association on entity-with-issue for entity
      selectedIssue.get('entities_with_issues').forEach(function(entity){
        if (entity.get('onestop_id').split('-')[0] === 'r') {
          rspIds.push(entity.get('onestop_id'));
        }
        else if (entity.get('onestop_id').split('-')[0] === 's') {
          stopIds.push(entity.get('onestop_id'));
        }
      });

      let getStops = function(stopIds) {
        return new Promise(function(resolve, reject){
          if (stopIds.length > 0) {
            resolve(self.store.query('stop', {onestop_id: stopIds.join(',')}));
          }
          else {
            resolve();
          }
        });
      }

      let getRSPs = function(rspIds) {
        return new Promise(function(resolve, reject){
          resolve(self.store.query('route-stop-pattern', {onestop_id: rspIds.join(',')}));
        });
      }

      return Ember.RSVP.allSettled([
        getStops(stopIds), getRSPs(rspIds)
      ]).then(function(results){
        let [stops, rsps] = results.filter(function(result){ return result.state === 'fulfilled'; }).map(function(result){ return result.value; });
        let bounds = new L.latLngBounds([]);

        if (stops) {
          stops.forEach(function(stop){
            bounds.extend(new L.latLng(stop.get('coordinates')));
          });
        }

        if (rsps) {
          rsps.forEach(function(rsp){
            // Distance calc issue details come with a full array of stop distances along the RSP
            if (selectedIssue.get('issue_type') == 'distance_calculation_inaccurate') {
              let re = 'Distances: \\[.+\\]';
              let match = selectedIssue.get('details').match(re);
              if (match) {
                rsp.set('stop_distances', eval(match[0].replace('Distances: ', '')));
                selectedIssue.set('details', selectedIssue.get('details').replace(/Distances: \[.+\]/, ''));
              }
            }

            rsp.get('coordinates').forEach(function(coord){
              bounds.extend(new L.latLng(coord));
            });
          });
        }

        return Ember.RSVP.hash({
          selectedIssue: selectedIssue,
          issueRouteStopPatterns: rsps,
          issueStops: stops,
          bounds: bounds,
          changeset: changeset,
          users: users
        });
      });
    });
  }
});
