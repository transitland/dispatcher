import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render();

    this.render('components/issue-table', {
      into: 'issues.route-geometry.index',
      outlet: 'issue-table'
    });
  },

  model: function(params) {
    params['issue_type'] = ['stop_rsp_distance_gap',
                            'distance_calculation_inaccurate',
                            'rsp_line_inaccurate',
                            'stop_position_inaccurate'].join(',');
    params['open'] = true;
    var issues = this.store.query('issue', params);
    return Ember.RSVP.hash({
      issues: issues,
      bounds: L.latLngBounds([L.latLng(37.77, -122.4), L.latLng(37.76,-122.5)])
    });
  }
});
