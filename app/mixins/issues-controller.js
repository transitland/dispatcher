import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: ['feed_onestop_id', 'open', 'issue_type', 'per_page', 'of_entity'],

  issue_type: '',

  feed_onestop_id: '',

  open: true,

  per_page: '∞',

  of_entity: '',

  queryParamsObject: function() {
    var queryParams = {};
    var self = this;
    this.get('queryParams').forEach(function(param) { queryParams[param] = self.get(param);  });
    return queryParams;
  },

  index_route: '',

  show_route: '',

  // this is not a query param
  selected: false,

  actions: {
    issueClicked: function(issue) {
      if (this.get('model.selectedIssue')) {
        if (issue.get('id') === this.model.selectedIssue.id) {
          return;
        }
      }
      var self = this;
      this.set('selected', !this.get('selected'));
      let queryParamsObject = self.queryParamsObject();
      this.transitionToRoute(this.show_route, issue.id, { queryParams: queryParamsObject });
    },
    typeChanged: function(selected) {
      this.set('issue_type', selected);
      let queryParamsObject = self.queryParamsObject();
      self.transitionToRoute(this.index_route, { queryParams: queryParamsObject });
    }
  }
});
