import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['feed_onestop_id', 'open', 'issue_type'],

  issue_type: '',

  feed_onestop_id: '',

  open: true,

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
