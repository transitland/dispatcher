import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['feed_onestop_id', 'open'],

  feed_onestop_id: '',

  open: true,

  actions: {
    issueClicked: function(issue) {
      this.transitionToRoute('issues.route-geometry.show', issue.id, { queryParams: {feed_onestop_id: this.get('feed_onestop_id') } });
    }
  }
});
