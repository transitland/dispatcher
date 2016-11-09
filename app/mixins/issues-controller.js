import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: ['feed_onestop_id', 'open', 'issue_type', 'per_page'],

  issue_type: '',

  feed_onestop_id: '',

  open: true,

  per_page: '∞',

  queryParamsObject: function() {
    var queryParams = {};
    var self = this;
    this.get('queryParams').forEach(function(param) { queryParams[param] = self.get(param);  });
    return queryParams;
  },

  actions: {
    typeChanged: function(selected) {
      this.set('issue_type', selected);
    }
  }
});
