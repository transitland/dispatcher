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

  route_route: '',

  actions: {
    issueClicked: function(issue) {
      let queryParamsObject = this.queryParamsObject();
      this.transitionToRoute(this.root_route + '.show', issue.id, { queryParams: queryParamsObject });
    },
    typeChanged: function(selected) {
      this.set('issue_type', selected);
      let queryParamsObject = this.queryParamsObject();
      this.transitionToRoute(this.root_route + '.index', { queryParams: queryParamsObject });
    }
  }
});
