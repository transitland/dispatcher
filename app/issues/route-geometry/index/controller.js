import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['feed_onestop_id', 'open', 'status', 'issue_type', 'per_page'],

  issue_type: '',

  feed_onestop_id: '',

  open: true,

  per_page: '∞',

  status: 0,

  queryParamsObject: function() {
    var queryParams = {};
    var self = this;
    this.get('queryParams').forEach(function(param) { queryParams[param] = self.get(param);  });
    return queryParams;
  },

  actions: {
    issueClicked: function(issue) {
      let queryParams = this.queryParamsObject();
      this.transitionToRoute('issues.route-geometry.show', issue.id, { queryParams: queryParams });
    },
    typeChanged: function(selected) {
      this.set('issue_type', selected);
      let queryParams = this.queryParamsObject();
      this.transitionToRoute('issues.route-geometry.index', { queryParams: queryParams });
    }
  }
});
