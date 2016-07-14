import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    params['issue_type'] = ['stop_rsp_distance_gap',
                            'distance_calculation_inaccurate',
                            'rsp_line_inaccurate',
                            'stop_position_inaccurate'].join(',')
    var issues = this.store.query('issue', params);
    return Ember.RSVP.hash({
      issues: issues,
      selectedIssue: null,
      issueRouteStopPatterns: null,
      issueStops: null
    });
  }
});
