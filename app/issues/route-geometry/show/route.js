import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render();

    this.render('components/issue-table', {
      into: 'issues.route-geometry.show',
      outlet: 'issue-table'
    });
  },

  afterModel: function(model, transition) {
    var rsps = [];
    var stops = [];
    model.selectedIssue.get('entities_with_issues').forEach(function(entity){
      if (entity.onestop_id.split('-')[0] === 'r') {
        rsps.push(entity.onestop_id);
      }
      else if (entity.onestop_id.split('-')[0] === 's') {
        stops.push(entity.onestop_id);
      }
    });
    rsps = this.store.query('route-stop-pattern', {onestop_id: rsps.join(',')});
    stops = this.store.query('stop', {onestop_id: stops.join(',')});
    model.issueRouteStopPatterns = rsps;
    model.issueStops = stops;

    stops.then(function(){
      var bounds = new L.latLngBounds(stops.map(function(stop) {
        return new L.latLng(stop.get('coordinates'));
      }));

      rsps.then(function(){
        rsps.forEach(function(rsp){
          rsp.get('coordinates').forEach(function(coord){
            bounds.extend(new L.latLng(coord));
          });
        });
        //model.bounds = bounds;
      });
    });
  },

  model: function(params) {
    params['issue_type'] = ['stop_rsp_distance_gap',
                            'distance_calculation_inaccurate',
                            'rsp_line_inaccurate',
                            'stop_position_inaccurate'].join(',');
    params['open'] = true;
    var issues = this.store.query('issue', params);
    let changeset = this.store.createRecord('changeset', {
      notes: 'Issue resolution:'
    });
    let selectedIssue =  this.store.find('issue', params['issue_id']);
    changeset.get('change_payloads').createRecord();
    return Ember.RSVP.hash({
      issues: issues,
      selectedIssue: selectedIssue,
      issueRouteStopPatterns: null,
      issueStops: null,
      bounds: null,
      changeset: changeset
    });
  }
});
