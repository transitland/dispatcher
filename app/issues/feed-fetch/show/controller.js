import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';

export default Ember.Controller.extend(IssuesController, {
  selected: false,

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
    toggleApplyMessage: function() {
      this.set('applyMessage.show', false);
      if (this.get('applyMessage').status === 'complete') {
        this.store.unloadAll();
        this.transitionToRoute('issues.feed-fetch.index');
      }
      if (this.get('applyMessage').status === 'queued') {
        var applicationAdapter = this.store.adapterFor('changeset');
        var modelUrl = applicationAdapter.buildURL('changeset', this.model.changeset.id);
        var applyUrl = modelUrl + '/apply_async';
        this.pollChangesetApply(this.model.feed.get('issues').get('firstObject'), applyUrl, applicationAdapter);
      }
      if (this.get('applyMessage').status === 'error') {
        // clean the changeset
        let changeset = this.store.createRecord('changeset', {
          notes: 'Issue resolution:'
        });
        changeset.get('change_payloads').createRecord();
        this.set('model.changeset', changeset);
      }
    },
    closeDialog: function() {
      this.set('closeMessage', { show: true, message: 'Closing issues is unavailable.' } );
    },
    closeIssue: function() {
    }
  }
});
