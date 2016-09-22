import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    issue_type: {
      refreshModel: true
    }
  },

  model: function(params) {
    let issueTypes = ['all', 'stop_rsp_distance_gap',
                      'distance_calculation_inaccurate',
                      'rsp_line_inaccurate',
                      'stop_position_inaccurate'];
    if (!('issue_type' in params) || params['issue_type'] === 'all') params['issue_type'] = issueTypes.join(',')
    let issues = this.store.query('issue', params);
    return Ember.RSVP.hash({
      issues: issues,
      issueTypes: issueTypes,
      bounds: L.latLngBounds([L.latLng(37.77, -122.4), L.latLng(37.76,-122.5)])
    });
  }
});
