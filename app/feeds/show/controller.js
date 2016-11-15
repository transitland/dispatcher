import Ember from 'ember';
import IssueResolvingChangesetsController from 'dispatcher/mixins/issue-resolving-changesets-controller';

export default Ember.Controller.extend(IssueResolvingChangesetsController, {
  getChanges: function() {
    var ret = {};
    ret['action'] = 'createUpdate';
    ret['issuesResolved'] = [1];
    ret['feed'] = { url: '' };
    return [ret];
  }
});
