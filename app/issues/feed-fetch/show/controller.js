import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';

export default Ember.Controller.extend(IssuesController, {
  selected: false,

  index_route: 'issues.feed-fetch.index',

  getChanges: function() {
    let thisIssue = this.model.selectedIssue;
    var ret = {};
    ret['action'] = 'createUpdate';
    ret['issuesResolved'] = [ Number(thisIssue.get('id')) ];
    ret['feed'] = { onestopId: this.model.feed.get('onestop_id'),  url: this.model.feed.get('url') };
    return [ret];
  },

  actions: {
    issueClicked: function(issue) {
      var self = this;
      this.set('selected', !this.get('selected'));
      let queryParamsObject = self.queryParamsObject();
      this.transitionToRoute('issues.feed-fetch.show', issue.id, { queryParams: queryParamsObject });
    },
    closeDialog: function() {
      this.set('closeMessage', { show: true, message: 'Closing issues is unavailable.' } );
    },
    closeIssue: function() {
    }
  }
});
