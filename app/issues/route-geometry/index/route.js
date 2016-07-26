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
      issues: issues
    });
  }
});
