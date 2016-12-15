import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: ['feed_onestop_id', 'open', 'issue_type', 'per_page', 'of_entity', 'sort_key', 'sort_order'],

  issue_type: '',

  feed_onestop_id: '',

  open: true,

  per_page: '∞',

  of_entity: '',

  sort_key: 'created_at',

  sort_order: 'desc',

  queryParamsObject: function() {
    var queryParams = {};
    var self = this;
    this.get('queryParams').forEach(function(param) { queryParams[param] = self.get(param);  });
    return queryParams;
  },

  actions: {
    issueClicked: function(issue) {
      let queryParamsObject = this.queryParamsObject();
      this.transitionToRoute(this.rootRoute + '.show', issue.id, { queryParams: queryParamsObject });
    },
    typeChanged: function(selected) {
      this.set('issue_type', selected);
      let queryParamsObject = this.queryParamsObject();
      this.transitionToRoute(this.rootRoute + '.index', { queryParams: queryParamsObject });
    }
  }
});
