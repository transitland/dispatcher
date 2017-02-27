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

    var self = this;
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
          rsps.push(entity.get('onestop_id'));
        }
        else if (entity.get('onestop_id').split('-')[0] === 's') {
          stops.push(entity.get('onestop_id'));
        }
      });
      return self.store.query('stop', {onestop_id: stops.join(',')}).then(function(stops){

        var bounds = new L.latLngBounds(stops.map(function(stop) {
          return new L.latLng(stop.get('coordinates'));
        }));
        return self.store.query('route-stop-pattern', {onestop_id: rsps.join(',')}).then(function(rsps){

          rsps.forEach(function(rsp){

            if (selectedIssue.get('issue_type') === 'distance_calculation_inaccurate') {
              let re = 'Distances: \\[.+\\]';
              rsp.set('stop_distances', eval(selectedIssue.get('details').match(re)[0].replace('Distances: ', '')));
              selectedIssue.set('details', selectedIssue.get('details').replace(/Distances: \[.+\]/, ''));
            }

            rsp.get('coordinates').forEach(function(coord){
              bounds.extend(new L.latLng(coord));
            });
          });

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
    });
  }
});
